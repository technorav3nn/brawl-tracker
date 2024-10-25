import { eq } from "drizzle-orm";
import { db } from "$server/db";
import { users, sessions, supercellIdProfiles, tokens } from "$server/db/schema/users";

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
		return db.transaction(async (tx) => {
			await tx.delete(supercellIdProfiles).where(eq(supercellIdProfiles.userId, userId));
			await tx.delete(tokens).where(eq(tokens.userId, userId));
			await tx.delete(sessions).where(eq(sessions.userId, userId));
			await tx.delete(users).where(eq(users.id, userId));
		});
	} catch (error) {
		console.error(error);
		throw createError({
			statusCode: 500,
			statusMessage: "Failed to delete account",
		});
	}
});
