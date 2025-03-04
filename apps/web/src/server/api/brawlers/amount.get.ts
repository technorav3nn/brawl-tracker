export default cachedEventHandler(
	async () => {
		const brawlApi = useBrawlApi();
		return (await brawlApi.brawlers.getAllBrawlers()).list.length;
	},
	{
		maxAge: 60 * 60,
		swr: true,
		name: "brawlers-data-amount",
	}
);
