export default cachedEventHandler(
	async () => {
		const { list: maps } = await useBrawlifyApi().maps.getAllMaps();
		return maps.filter((map) => !map.disabled);
	},
	{
		swr: true,
		maxAge: 60 * 60 * 24,
	}
);
