export default cachedEventHandler(
	async () => {
		const { list: brawlers } = await getBrawlers();
		return brawlers;
	},
	{ maxAge: 10_000 }
);
