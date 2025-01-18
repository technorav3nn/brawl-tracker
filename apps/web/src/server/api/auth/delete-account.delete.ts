import { eq } from "drizzle-orm";
import { db } from "$server/db";
import { users, sessions, supercellIdProfiles, tokens } from "$server/db/schema";

export default eventHandler(async (event) => {
	if (!event.context.session) {
		throw createError({
			statusCode: 403,
			statusMessage: "You must be logged in to delete your account",
		});
	}

	const userId = event.context.session.userId;

	if (!(await readBody(event)).confirm) {
		throw createError({
			statusCode: 400,
			statusMessage: "You must confirm the deletion of your account",
		});
	}

	// Delete user
	try {
		await db.delete(supercellIdProfiles).where(eq(supercellIdProfiles.userId, userId));
		await db.delete(tokens).where(eq(tokens.userId, userId));
		await db.delete(sessions).where(eq(sessions.userId, userId));
		await db.delete(users).where(eq(users.id, userId));
	} catch (error) {
		console.error(error);
		throw createError({
			statusCode: 500,
			statusMessage: "Failed to delete account",
		});
	}
});
