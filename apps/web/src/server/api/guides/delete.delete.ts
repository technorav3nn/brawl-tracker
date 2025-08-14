import { z } from "zod";

const schema = z.object({
	id: z.string(),
});

export default defineEventHandler(async (event) => {
	if (!event.context.user) {
		throw createError({ statusCode: 401, statusMessage: "Unauthorized" });
	}

	const { success, data, error } = await readValidatedBody(event, (d) => schema.safeParse(d));

	if (!success) {
		throw error.issues;
	}

	const { db, guide } = useDrizzle();
	const { id } = data;

	await db.delete(guide).where(and(eq(guide.id, id), eq(guide.authorId, event.context.user.id)));

	return { success: true };
});
