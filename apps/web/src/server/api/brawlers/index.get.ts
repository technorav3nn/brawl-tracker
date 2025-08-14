export default cachedEventHandler(
	async () => {
		const brawlApi = useBrawlApi();
		const data = await brawlApi.brawlers.getAllBrawlers();
		return { list: data.list.filter((brawler) => brawler.name !== "Buzz Lightyear") };
	},
	{
		maxAge: 60 * 60, // 1 hour
		swr: true,
		name: "brawlers-data",
	}
);
