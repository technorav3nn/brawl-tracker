import { updateTagBodySchema } from "$lib/validation/server/tag-api-schema";
import { db } from "$server/db";
import { users } from "$server/db/schema";

export default eventHandler(async (event) => {
	const body = await readValidatedBody(event, (data) => updateTagBodySchema.safeParse(data));
	const { playerTags, clubTags } = body.data!;
	const user = event.context.user;

	if (!user?.id) {
		throw createError({
			status: 401,
			statusMessage: "You must be logged in to update saved tags.",
		});
	}

	const { savedPlayerTags, savedClubTags } = (
		await db
			.update(users)
			.set({
				savedPlayerTags: playerTags,
				savedClubTags: clubTags,
			})
			.returning()
	)[0];

	return {
		playerTags: savedPlayerTags,
		clubTags: savedClubTags,
	};
});
