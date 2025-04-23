export default defineEventHandler(async (event) => {
	if (!event.context.user) {
		throw createError({ statusCode: 401, statusMessage: "Unauthorized" });
	}

	const { db } = useDrizzle();
	const user = await db.query.user.findFirst({ where: (user) => eq(user.id, event.context.user!.id) });

	return user?.savedPlayers ?? [];
});
