export default defineEventHandler(async (event) => {
	const id = event.context.params?.id;
	if (!id) {
		throw createError({ statusCode: 400, statusMessage: "Bad Request" });
	}

	const { db } = useDrizzle();
	const guide = await db.query.guide.findFirst({
		where: (guide) => eq(guide.id, id),
		with: { user: true },
	});
	if (!guide) {
		throw createError({ statusCode: 404, statusMessage: "Not Found" });
	}

	return guide;
});
