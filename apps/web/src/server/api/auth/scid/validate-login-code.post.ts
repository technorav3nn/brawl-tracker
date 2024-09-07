import { validateLoginCode } from "@brawltracker/supercell-id-api";
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
				statusMessage: "Invalid code, try again",
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
		console.log((result as any).data);

		const existingUser = await db.query.users.findFirst({
			where: (users, { eq }) => eq(users.supercellId, accountBrawlStarsId),
		});

		if (existingUser) {
			const session = await lucia.createSession(existingUser.id, {});
			appendHeader(event, "Set-Cookie", lucia.createSessionCookie(session.id).serialize());
			return await sendRedirect(event, "/");
		}

		const userId = generateIdFromEntropySize(10); // 16 characters long

		await db.insert(users).values({
			id: userId,
			username: brawlStarsUsername,
			email,
			supercellId: accountBrawlStarsId,
		});

		const session = await lucia.createSession(userId, {});
		appendHeader(event, "Set-Cookie", lucia.createSessionCookie(session.id).serialize());
		return await sendRedirect(event, "/");
	} catch (error) {
		console.error(error);
		throw createError({
			statusMessage: "Invalid code, incorrect pin",
			statusCode: 400,
		});
	}
});
