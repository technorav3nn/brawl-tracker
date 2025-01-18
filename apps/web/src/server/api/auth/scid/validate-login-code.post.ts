import {
	confirmLoginCode,
	getProfile,
	getSessionToken,
	highLowToId,
	idToTag,
	validateLoginCode,
} from "@brawltracker/supercell-id-api";
import { generateIdFromEntropySize } from "lucia";
import { SAVED_TAGS_SECURE_SEPERATOR } from "$lib/constants";
import { lucia } from "$server/auth";
import { db } from "$server/db";
import { supercellIdProfiles, tokens, users } from "$server/db/schema";
import { useIpToCountry } from "$server/utils/ip-to-country";

export default eventHandler(async (event) => {
	const { code, email }: { code: string; email: string } = getQuery(event);

	if (typeof code !== "string" || code.length !== 6 || !/^\d+$/.test(code)) {
		throw createError({
			statusMessage: "Invalid code format: must be a 6-digit number",
			statusCode: 400,
		});
	}

	const result = await validateLoginCode(email, code);
	if (!result) {
		throw createError({
			statusMessage: "Invalid code: Try again",
			statusCode: 400,
		});
	}

	if (result && !result.ok) {
		throw createError({
			statusMessage: (result as any).error,
			statusCode: 400,
		});
	}

	const accountBrawlStarsId = (result as any).data.application.account as string;
	const brawlStarsUsername = (result as any).data.application.username as string;

	const existingUser = await db.query.users.findFirst({
		where: (users, { eq }) => eq(users.supercellId, accountBrawlStarsId),
	});

	const ip = event.headers.get("x-forwarded-for") || event.node.req.socket.remoteAddress;
	if (!ip) {
		throw createError({
			statusMessage: "Failed to get IP address",
			statusCode: 500,
		});
	}

	const ipCountry = useIpToCountry(ip);

	console.log("IP: ", ip, "Country: ", ipCountry);

	if (existingUser) {
		const session = await lucia.createSession(existingUser.id, {
			ipCountry,
		});
		appendHeader(event, "Set-Cookie", lucia.createSessionCookie(session.id).serialize());
		return await sendRedirect(event, "/");
	}

	const {
		data: { scidToken },
	} = await confirmLoginCode(email, code);

	const userId = generateIdFromEntropySize(10); // 16 characters long

	const scidSession = await getSessionToken(scidToken);
	if (!scidSession.ok) {
		throw createError({
			statusMessage: "Couldn't fetch session",
			statusCode: 500,
		});
	}

	const { ok, token } = await $fetch<{ ok: true; token: string }>(
		"https://security.id.supercell.com/api/security/v1/sessionToken",
		{
			headers: {
				Authorization: `Bearer ${scidToken}`,
				"User-Agent": "scid/1.4.16-f (iPadOS 17.1; laser-prod; iPad8,6)",
				"X-Supercell-Device-Id": "0D2CB22F-243F-5843-8A60-3E8F0685BBD0",
			},
		}
	);
	if (!ok) {
		throw createError({
			statusMessage: "Couldn't fetch token",
			statusCode: 500,
		});
	}

	const profile = await getProfile(token);
	const brawlstars = useBrawlStarsApi();
	console.log("SECRET:", useRuntimeConfig().apiEncryptionSecret);

	const connectedSystem = profile.data?.connectedSystems.find((system) => system.application === "laser-prod");
	if (!connectedSystem?.applicationAccountId) {
		throw createError({
			statusMessage: "Couldn't get high-low ID, profile is invalid",
			statusCode: 500,
		});
	}

	const tag = idToTag(highLowToId(connectedSystem.applicationAccountId));
	const playerProfile = await brawlstars.players.getPlayer(tag);

	if (!playerProfile) {
		throw createError({
			statusMessage: "Couldn't get player profile",
			statusCode: 500,
		});
	}

	const [{ insertedId }] = await db
		.insert(users)
		.values({
			id: userId,
			username: brawlStarsUsername,
			email,
			supercellId: accountBrawlStarsId,
			__ATTRIBUTES__sessionToken: scidSession.token,
			savedPlayerTags: [`${tag}${SAVED_TAGS_SECURE_SEPERATOR}${playerProfile.name}`],
			savedClubTags: [],
		})
		.returning({ insertedId: users.id });

	const iv = generateIV();
	const encryptedScidToken = aes256cbcEncrypt(scidToken, useRuntimeConfig().apiEncryptionSecret, iv);

	await db
		.insert(tokens)
		.values({ scidToken: encryptedScidToken, sessionToken: scidSession.token, scidTokenIv: iv.toString("hex"), userId });
	await db.insert(supercellIdProfiles).values({
		name: profile.data!.name.name,
		qrCodeUrl: profile.data!.qrCodeURL,
		userId: insertedId,
		scid: profile.data!.scid,
		universalLink: profile.data!.universalLink,
		avatarImage: profile.data!.avatarImage.image,
	});

	const session = await lucia.createSession(userId, {
		ipCountry,
	});
	appendHeader(event, "Set-Cookie", lucia.createSessionCookie(session.id).serialize());
	setResponseStatus(event, 200);

	return await sendRedirect(event, "/");
});
