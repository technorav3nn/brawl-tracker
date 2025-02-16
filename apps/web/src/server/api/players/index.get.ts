// Query param version of /players/[id].ts

import { verifyTag } from "@brawltracker/supercell-api-utils";

export default defineEventHandler(async (event) => {
	const query = getQuery(event);
	if (!query.tag) {
		throw createError({
			statusCode: 400,
			statusMessage: 'Missing required query parameter "tag"',
		});
	}

	if (!verifyTag(query.tag as string)) {
		throw createError({
			statusCode: 400,
			statusMessage: "Invalid tag entered",
		});
	}

	const api = useBrawlStarsApi();
	try {
		return await api.players.getPlayer((query.tag as string).replaceAll("%23", ""));
	} catch {
		throw createError({
			statusCode: 404,
			statusMessage: "Player with that tag was not found",
		});
	}
});
