export default cachedEventHandler(
	async (event) => {
		const api = useBrawlApi();
		const query = getQuery(event);

		const modes = await api.gamemodes.getAllGamemodes();
		if (query.names) {
			return modes.list.map((mode) => ({ name: mode.name, imageUrl: mode.imageUrl }));
		}

		return modes.list;
	},
	{
		maxAge: 60 * 60 * 24, // 24 hours
		getKey: (event) => {
			const query = getQuery(event);
			return `modes-${query.names ? "names" : "all"}`;
		},
	}
);
