export default eventHandler((event) => {
	const tag = getRouterParam(event, "tag");
	if (!tag) {
		return new Response("No tag provided", { status: 400 });
	}

	return useBrawlStarsApi().clubs.getClub(tag);
});
