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
		maxAge: 60 * 60 * 24, // 1 day
		name: "brawler-cdn-data",
	}
);
