export default defineCachedEventHandler(
	async () => {
		const icons = await useBrawlApi().icons.getAllIcons();
		const values = Object.values(icons.player);

		return values.filter((icon) => icon.brawler !== null && icon.name.includes("hero"));
	},
	{
		maxAge: 1000 * 60 * 60 * 24, // 24 hours
	}
);
