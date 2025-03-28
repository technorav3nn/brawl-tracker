export default defineEventHandler(async (event) => {
	const query = getQuery(event);
	if (!query.tag) {
		throw createError({
			statusCode: 400,
			statusMessage: 'Missing required query parameter "tag"',
		});
	}

	setHeader(event, "Cache-Control", "public, max-age=180, stale-while-revalidate=60, stale-if-error=900");

	const api = useBrawlStarsApi();
	try {
		return await api.players.getPlayerBattleLog((query.tag as string).replaceAll("%23", ""));
	} catch {
		return [];
	}
});
