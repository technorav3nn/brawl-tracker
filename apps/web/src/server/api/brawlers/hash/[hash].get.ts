// Get a brawler by hash (e.g. Larry-&-Lawrie)
export default cachedEventHandler(
	async (event) => {
		const { list: brawlers } = await getBrawlers();
		const name = event.context.params!.hash?.replaceAll("%20", "-");
		const brawler = brawlers.find((b) => b.hash.toLowerCase() === name?.toLowerCase());
		if (!brawler) {
			throw createError({ statusCode: 404, message: "Brawler not found" });
		}

		return brawler;
	},
	{ maxAge: 10, name: "getBrawlerByName" }
);
