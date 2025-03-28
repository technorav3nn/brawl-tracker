export default defineCachedEventHandler(
	() => {
		const brawlApi = useBrawlApi();
		return brawlApi.gamemodes.getAllGamemodes();
	},
	{
		maxAge: 1000 * 60 * 60 * 24, // 24 hours
	}
);
