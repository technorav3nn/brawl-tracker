import { sql } from "drizzle-orm";
import { SAVED_TAGS_SECURE_SEPERATOR } from "$lib/constants";
import { removeTagBodySchema } from "$lib/validation/server/tag-api-schema";
import { db } from "$server/db";
import { users } from "$server/db/schema";

export default eventHandler(async (event) => {
	const body = await readValidatedBody(event, (data) => removeTagBodySchema.safeParse(data));
	const { tag, type } = body.data!;
	const user = event.context.user;

	if (!user?.id) {
		throw createError({
			status: 401,
			statusMessage: "You must be logged in to remove a saved tag.",
		});
	}

	if (tag.includes(user.supercellId ?? "")) {
		throw createError({
			status: 400,
			statusMessage: "You cannot add a tag that includes your own in-game ID.",
		});
	}

	const sqlStatement = sql`array_remove(${type === "player" ? "saved_tags" : "saved_club_tags"}, ${tag.replace(" - ", SAVED_TAGS_SECURE_SEPERATOR)})`;

	const { savedPlayerTags, savedClubTags } = (
		await db
			.update(users)
			.set(
				type === "player"
					? {
							savedPlayerTags: sqlStatement,
						}
					: {
							savedClubTags: sqlStatement,
						}
			)
			.returning()
	)[0];

	if (!savedPlayerTags.includes(tag) || !savedClubTags.includes(tag)) {
		throw createError({
			status: 400,
			statusMessage: "The tag was not added.",
		});
	}

	return type === "player" ? savedPlayerTags : savedClubTags;
});
