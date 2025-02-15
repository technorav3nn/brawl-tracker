import type { BrawlApiBrawler } from "@brawltracker/brawl-api";

export default cachedEventHandler(
	async (event) => {
		const brawlerId = event.context.params?.id;
		if (!brawlerId) {
			throw createError({ statusCode: 400, statusMessage: "Missing id for brawler" });
		}

		const brawlApi = useBrawlApi();
		return await brawlApi.brawlers.getBrawlerById(brawlerId);
	},
	{
		maxAge: 60 * 60,
		swr: true,
		name: "brawler-by-id-data",
	}
);
