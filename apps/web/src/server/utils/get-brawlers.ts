export const getBrawlers = cachedFunction(async () => {
	const brawlApi = useBrawlifyApi();
	return await brawlApi.brawlers.getAllBrawlers();
});
