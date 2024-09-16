import { confirmLoginCode, validateLoginCode } from "@brawltracker/supercell-id-api";
import { generateIdFromEntropySize } from "lucia";
import { lucia } from "$server/auth";
import { db } from "$server/db";
import { users } from "$server/db/schema/users";

export default eventHandler(async (event) => {
	const { code, email }: { code: string; email: string } = getQuery(event);

	if (typeof code !== "string" || code.length !== 6 || !/^\d+$/.test(code)) {
		throw createError({
			statusMessage: "Invalid code format: must be a 6-digit number",
			statusCode: 400,
		});
	}

	try {
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

		if (existingUser) {
			const session = await lucia.createSession(existingUser.id, {});
			appendHeader(event, "Set-Cookie", lucia.createSessionCookie(session.id).serialize());
			return await sendRedirect(event, "/");
		}

		const {
			data: { scidToken },
		} = await confirmLoginCode(email, code);

		const userId = generateIdFromEntropySize(10); // 16 characters long

		const { token } = await $fetch<{ ok: boolean; token: string }>(
			"https://security.id.supercell.com/api/security/v1/sessionToken",
			{
				headers: {
					Authorization: `Bearer ${scidToken}`,
					"User-Agent": "scid/1.4.16-f (iPadOS 17.1; laser-prod; iPad8,6)",
					"X-Supercell-Device-Id": "0D2CB22F-243F-5843-8A60-3E8F0685BBD0",
				},
			}
		);

		await db.insert(users).values({
			id: userId,
			username: brawlStarsUsername,
			email,
			supercellId: accountBrawlStarsId,
			scidToken,
			scidApiSessionToken: token,
		});

		const session = await lucia.createSession(userId, {});
		appendHeader(event, "Set-Cookie", lucia.createSessionCookie(session.id).serialize());
		setResponseStatus(event, 200);

		return await sendRedirect(event, "/");
	} catch (error) {
		console.error(error);
		throw createError({
			statusMessage: "Invalid code: Incorrect pin",
			statusCode: 400,
		});
	}
});
