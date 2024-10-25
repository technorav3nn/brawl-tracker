import { z } from "zod";
import { lucia } from "$server/auth";

const bodySchema = z.object({
	sessionId: z.string().optional(),
	all: z.boolean().optional().default(false),
});

export default eventHandler(async (event) => {
	const body = await readValidatedBody(event, (b) => bodySchema.safeParse(b));
	const userId = event.context.user?.id;

	if (!userId) {
		throw createError({ statusCode: 401, statusMessage: "Unauthorized" });
	}

	if (!body.success) {
		throw body.error.issues;
	}

	const currentSessionId = event.context.session?.id;
	const inputSessionId = body.data.sessionId;

	if (currentSessionId === inputSessionId) {
		throw createError({ statusCode: 400, statusMessage: "Cannot invalidate current session, use logout instead" });
	}

	if (body.data.all) {
		await lucia.invalidateUserSessions(userId);
		return { success: true };
	}

	await lucia.invalidateSession(userId);
	return { success: true };
});
