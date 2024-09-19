import { eq, sql } from "drizzle-orm";
import { db } from "$server/db";
import { tokens } from "$server/db/schema/users";

export default defineEventHandler(async (event) => {
	if (!event.context.user) {
		throw createError({
			statusCode: 401,
			message: "Unauthorized",
		});
	}

	const user = await db.query.users.findFirst({
		where: (users, { eq }) => eq(users.id, event.context.user!.id),
		with: {
			tokens: true,
		},
	});
	if (!user) {
		throw createError({
			statusCode: 400,
			statusMessage: "User not found",
		});
	}

	const {
		tokens: { scidToken, sessionToken, sessionTokenExpiry },
	} = user;

	if (!scidToken) {
		throw createError({
			statusCode: 400,
			statusMessage: "User has no SCID token, not logged in with Supercell ID",
		});
	}

	// If the session expriy is 30 hours, and the current time before that, then return the session token
	if (new Date() > sessionTokenExpiry) {
		return { token: sessionToken, c: true };
	}

	const response = await $fetch<{ ok: boolean; token: string }>(
		"https://security.id.supercell.com/api/security/v1/sessionToken",
		{
			headers: {
				Authorization: `Bearer ${scidToken}`,
				"User-Agent": "scid/1.4.16-f (iPadOS 17.1; laser-prod; iPad8,6)",
				"X-Supercell-Device-Id": "0D2CB22F-243F-5843-8A60-3E8F0685BBD0",
			},
		}
	);

	if (!response?.ok || !response.token) {
		console.error(response);
		throw createError({
			statusCode: 500,
			statusMessage: "Failed to fetch SCID token",
		});
	}

	await db
		.update(tokens)
		.set({
			sessionToken: response.token,
			sessionTokenExpiry: sql`now() + interval '30 hours'`,
		})
		.where(eq(tokens.userId, user.id));

	return { token: response.token, c: false };
});
