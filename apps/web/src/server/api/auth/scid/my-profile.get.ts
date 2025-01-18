import { getProfile, getSessionToken } from "@brawltracker/supercell-id-api";
import { eq } from "drizzle-orm";
import type { H3Event, EventHandlerRequest } from "h3";
import { FetchError } from "ofetch";
import { db } from "$server/db";
import { supercellIdProfiles, tokens, users, type SupercellIdProfileInsert } from "$server/db/schema";

async function handler(event: H3Event<EventHandlerRequest>, retry = false) {
	if (!event.context.user) {
		throw createError({
			statusCode: 401,
			message: "Unauthorized: no user",
		});
	}

	const { sessionToken: savedSessionToken, id } = event.context.user;

	if (!savedSessionToken) {
		throw createError({
			statusCode: 400,
			statusMessage: "User has no SCID token, not logged in with Supercell ID",
		});
	}

	if (!retry) {
		const existingProfile = await db.query.supercellIdProfiles.findFirst({
			where: (profile, { eq }) => eq(profile.userId, id),
		});

		if (existingProfile?.updatedAt) {
			// check updated at, if it's a day old then we should fetch the api to update the profile
			const profileExpired = Date.now() - existingProfile.updatedAt.getTime() > 86400000; // 1 day
			if (!profileExpired) {
				// update the profile's updatedAt
				return { exists: true, data: existingProfile };
			}
		}
	}

	const userTokens = await db.query.tokens.findFirst({
		where: (tokens, { eq }) => eq(tokens.userId, id),
		columns: { scidToken: true, sessionToken: true, scidTokenIv: true },
	});

	if (!userTokens) {
		return { exists: false, data: null };
	}

	const scidToken = aes256cbcDecrypt(
		userTokens.scidToken,
		useRuntimeConfig().apiEncryptionSecret,
		Buffer.from(userTokens.scidTokenIv, "hex")
	);

	const profile = await getProfile(userTokens.sessionToken).catch<any>(async (error) => {
		if (!(error instanceof FetchError)) {
			throw createError({
				statusCode: 400,
				statusMessage: "Failed to fetch profile",
			});
		}

		if (error.message.includes("401") && !retry) {
			// user needs a new session token
			const { token } = await getSessionToken(scidToken);

			try {
				await db.update(tokens).set({ sessionToken: token }).where(eq(tokens.userId, id));
				await db.update(users).set({ __ATTRIBUTES__sessionToken: token }).where(eq(users.id, id));
			} catch {
				throw createError({
					statusCode: 400,
					statusMessage: "Failed to update session token",
				});
			}

			// Temporary update of course
			event.context.user!.sessionToken = token;
			return await handler(event, true);
		} else {
			throw createError({
				statusCode: 400,
				statusMessage: "Failed to retry fetch profile",
			});
		}
	});

	if (!profile?.ok) {
		throw createError({
			statusCode: 400,
			statusMessage: "Failed to fetch profile",
		});
	}

	const columns: SupercellIdProfileInsert = {
		universalLink: profile.data!.universalLink,
		name: profile.data!.name.name,
		qrCodeUrl: profile.data!.qrCodeURL,
		scid: profile.data!.scid,
		avatarImage: profile.data!.avatarImage.image,
		userId: id,
	};

	await db.insert(supercellIdProfiles).values(columns).onConflictDoNothing().returning();

	return { exists: true, data: columns };
}

export default defineEventHandler(async (event) => handler(event));
