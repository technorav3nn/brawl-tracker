import { getTagsBodySchema } from "$lib/validation/server/tag-api-schema";
import { db } from "$server/db";

export default eventHandler(async (event) => {
	const query = await getValidatedQuery(event, (data) => getTagsBodySchema.safeParse(data));
	const { type } = query.data!;
	const user = event.context.user;

	if (!user?.id) {
		throw createError({
			status: 401,
			statusMessage: "You must be logged in to update saved tags.",
		});
	}

	const tags = await db.query.users.findFirst({
		where: (users, { eq }) => eq(users.id, user.id),
		columns: { savedClubTags: true, savedPlayerTags: true },
	});

	if (!tags) {
		throw createError({
			status: 500,
			statusMessage: "Couldn't get tags",
		});
	}

	return type === "player" ? tags.savedPlayerTags : tags.savedClubTags;
});
