export default cachedEventHandler(
	async (event) => {
		const api = useBrawlApi();
		const query = getQuery(event);
		const events = await api.events.getEventRotation();

		if (!query.type) throw createError({ status: 400, message: "Missing type query parameter" });
		const type = query.type as string;

		if (type === "active") {
			return events.active;
		} else if (type === "upcoming") {
			return events.upcoming;
		} else {
			throw createError({ status: 400, message: "Invalid type query parameter" });
		}
	},
	{
		maxAge: 600, // 10 minutes
	}
);
