import { eq } from "drizzle-orm";

export default defineEventHandler(async (event) => {
	if (import.meta.env.PROD) {
		throw createError({ statusCode: 403, statusMessage: "Forbidden" });
	}

	const { db, user } = useDrizzle();

	await db
		.update(user)
		.set({ savedPlayers: [{ name: "test", tag: "test" }] })
		.where(eq(user.id, event.context.user!.id));
});
