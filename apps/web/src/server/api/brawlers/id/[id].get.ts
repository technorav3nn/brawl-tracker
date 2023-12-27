// Get a brawler by id (e.g. 16000000)
export default cachedEventHandler(
	async (event) => {
		const { list: brawlers } = await getBrawlers();
		const id = event.context.params!.id;
		const brawler = brawlers.find((b) => b.id === Number.parseInt(id!, 10));
		if (!brawler) {
			throw createError({ statusCode: 404, message: "Brawler not found" });
		}

		return brawler;
	},
	{ maxAge: 10, name: "getBrawlerById" }
);
