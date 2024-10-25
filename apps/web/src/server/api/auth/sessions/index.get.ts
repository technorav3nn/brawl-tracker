import { lucia } from "$server/auth";

export default eventHandler(async (event) => {
	const userId = event.context.user?.id;
	if (!userId) {
		throw createError({ statusCode: 401, statusMessage: "Unauthorized" });
	}

	const sessions = await lucia.getUserSessions(userId);
	return sessions.map((session) => ({
		...session,
		currentSession: session.id === event.context.session?.id,
	}));
});
