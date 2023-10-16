import { brawlStarsApiClient } from "$/server/brawl-stars";

export default defineEventHandler(async (event) => {
	const tag = getRouterParam(event, "tag");
	if (!tag) {
		return new Response("No tag provided", { status: 400 });
	}

	return await brawlStarsApiClient.clubs.fetch(tag);
});
