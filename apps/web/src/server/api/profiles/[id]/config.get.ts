import { verifyTag, formatTag } from "@brawltracker/supercell-api-utils";
import { createAdminClient } from "$server/utils/appwrite";
import { findProfileByTag } from "$server/db/users/actions";

export default defineEventHandler(async (event) => {
	const tag = event.context.params?.id ? decodeURIComponent(event.context.params?.id) : null;
	if (!tag) {
		throw createError({ status: 400, message: "Missing tag" });
	} else if (!verifyTag(tag)) {
		throw createError({ status: 400, message: "Invalid tag" });
	}

	const cleanedTag = formatTag(decodeURIComponent(tag));
	const { databases } = createAdminClient();

	const data = await findProfileByTag(cleanedTag, databases);
	if (data.documents.length && data.documents[0]?.$id) {
		const profile = data.documents[0];
		if (profile) {
			return {
				background: profile.background,
				theme: profile.theme,
			};
		}
	}

	return {
		background: null,
		theme: null,
	};
});
