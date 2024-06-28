export default cachedEventHandler(
	async () => {
		const brawlApi = useBrawlApi();
		return await brawlApi.brawlers.getAllBrawlers();
	},
	{
		maxAge: 60 * 60,
		swr: true,
		name: "brawlers-data",
	}
);
