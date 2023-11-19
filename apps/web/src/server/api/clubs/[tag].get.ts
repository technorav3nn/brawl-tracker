export default eventHandler(async (event) => {
	const tag = getRouterParam(event, "tag");
	if (!tag) {
		return new Response("No tag provided", { status: 400 });
	}

	return await useBrawlStarsApi().clubs.fetch(tag);
});
