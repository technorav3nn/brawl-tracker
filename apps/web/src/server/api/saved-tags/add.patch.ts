import { sql } from "drizzle-orm";
import { SAVED_TAGS_SECURE_SEPERATOR } from "$lib/constants";
import { addTagsBodySchema } from "$lib/validation/server/tag-api-schema";
import { db } from "$server/db";
import { users } from "$server/db/schema";

export default eventHandler(async (event) => {
	const body = await readValidatedBody(event, (data) => addTagsBodySchema.safeParse(data));
	const { tags, type } = body.data!;
	const user = event.context.user;

	if (!user?.id) {
		throw createError({
			status: 401,
			statusMessage: "You must be logged in to remove a saved tag.",
		});
	}

	if (tags.some((t) => t.includes(user.supercellId ?? ""))) {
		throw createError({
			status: 400,
			statusMessage: "You cannot add a tag that includes your own in-game ID.",
		});
	}

	const sqlStatement = sql`${sql.raw(type === "player" ? "saved_tags" : "saved_club_tags")} || ARRAY[${sql.join(
		tags.map((t) => t.replace(" - ", SAVED_TAGS_SECURE_SEPERATOR)),
		sql.raw(",")
	)}]`;

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

	const tagWasRemoved = (type === "player" ? savedPlayerTags : savedClubTags).some((tag) =>
		tags.includes(tag.replace(SAVED_TAGS_SECURE_SEPERATOR, " - "))
	);
	if (!tagWasRemoved) {
		throw createError({
			status: 400,
			statusMessage: "The tag was not removed.",
		});
	}

	return type === "player" ? savedPlayerTags : savedClubTags;
});
