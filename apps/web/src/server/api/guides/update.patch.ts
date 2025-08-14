import { guideSchemaServer } from "$lib/schemas/guides";

export default defineEventHandler(async (event) => {
	if (!event.context.user) {
		throw createError({ statusCode: 401, statusMessage: "Unauthorized" });
	}

	const body = await readValidatedBody(event, (s) => guideSchemaServer.safeParse(s));
	if (!body.success || !body.data.guideId) {
		throw createError({ statusCode: 422, statusMessage: "Invalid data" });
	}

	const { sanitized, characterCount, iframesValid } = await sanitizeHtml(body.data.editorHtml);

	if (characterCount > 200) {
		throw createError({ statusCode: 422, statusMessage: "Content must be more than 100 characters" });
	}

	// I could filter them out but this is easier to implement lol
	if (!iframesValid) {
		throw createError({ statusCode: 422, statusMessage: "Invalid iframe source, nice try" });
	}

	const { db, guide } = useDrizzle();
	try {
		await db.batch([
			db
				.update(guide)
				.set({
					...body.data,
					isInDepth: body.data?.isInDepth ?? false,
					editorHtml: sanitized,
				})
				.where(and(eq(guide.id, body.data.guideId!), eq(guide.authorId, event.context.user.id))),
		]);
		return { success: true };
	} catch (error) {
		console.error(error);
		throw createError({ statusCode: 500, statusMessage: "Couldn't create guide post" });
	}
});
