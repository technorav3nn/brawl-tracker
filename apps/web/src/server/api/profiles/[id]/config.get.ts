import { verifyTag, formatTag } from "@brawltracker/supercell-api-utils";

export default defineEventHandler(async (event) => {
	const tag = event.context.params?.id ? decodeURIComponent(event.context.params?.id) : null;
	if (!tag) {
		throw createError({ status: 400, message: "Missing tag" });
	} else if (!verifyTag(tag)) {
		throw createError({ status: 400, message: "Invalid tag" });
	}

	const cleanedTag = formatTag(decodeURIComponent(tag));
	const { db } = useDrizzle();

	const user = await db.query.user.findFirst({ where: (user) => eq(user.tag, cleanedTag) });

	if (user) {
		return { background: user.background, theme: user.theme };
	}

	return {
		background: null,
		theme: null,
	};
});
