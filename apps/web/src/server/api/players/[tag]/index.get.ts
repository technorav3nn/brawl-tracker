export default defineEventHandler(async (event) => {
	if (!event.context.params!.tag) {
		throw createError({
			statusCode: 400,
			statusMessage: 'Missing required parameter "tag"',
		});
	}

	const api = useBrawlStarsApi();
	return await api.players.getPlayer(event.context.params!.tag.replaceAll("%23", ""));
});
