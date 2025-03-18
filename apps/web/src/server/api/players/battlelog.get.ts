export default defineEventHandler(async (event) => {
	const query = getQuery(event);
	if (!query.tag) {
		throw createError({
			statusCode: 400,
			statusMessage: 'Missing required query parameter "tag"',
		});
	}

	const api = useBrawlStarsApi();
	try {
		return await api.players.getPlayerBattleLog((query.tag as string).replaceAll("%23", ""));
	} catch {
		return [];
	}
});
