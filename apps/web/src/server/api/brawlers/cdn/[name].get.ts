import { getBrawlerData, isNameNormalized } from "@brawltracker/cdn";

export default cachedEventHandler(
	async (event) => {
		const id = event.context.params!.name!;
		if (!isNameNormalized(id)) {
			throw createError({ statusCode: 500, statusMessage: "Name not normalized" });
		}

		try {
			return getBrawlerData(encodeURIComponent(id));
		} catch {
			throw createError({ statusCode: 500, statusMessage: "Error getting brawler data" });
		}
	},
	{
		swr: true,
		maxAge: 86_400, // 24 hours
		name: "brawler-cdn-data",
	}
);
