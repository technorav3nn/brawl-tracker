import { guideSchemaServer } from "$lib/schemas/guides";

export default defineEventHandler(async (event) => {
	if (!event.context.user) {
		throw createError({ statusCode: 401, statusMessage: "Unauthorized" });
	}

	const body = await readValidatedBody(event, (s) => guideSchemaServer.safeParse(s));
	if (!body.success) {
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

	const userHasGuide = await db.query.guide.findFirst({
		where: and(eq(guide.authorId, event.context.user.id), eq(guide.brawlerId, body.data.brawlerId)),
	});
	if (userHasGuide) {
		throw createError({ statusCode: 409, statusMessage: "Guide already exists" });
	}

	try {
		await db.batch([
			db.insert(guide).values({
				...body.data,
				isInDepth: body.data?.isInDepth ?? false,
				editorHtml: sanitized,
				authorId: event.context.user.id,
			}),
		]);
		return { success: true };
	} catch (error) {
		console.error(error);
		throw createError({ statusCode: 500, statusMessage: "Couldn't create guide post" });
	}
});
