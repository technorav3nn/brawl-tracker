import { getBrawlerData } from "@brawltracker/cdn/v2";

export default cachedEventHandler(
	async (event) => {
		const id = event.context.params!.id!;

		try {
			return getBrawlerData(encodeURIComponent(id));
		} catch {
			throw createError({ statusCode: 500, statusMessage: "Error getting brawler data" });
		}
	},
	{
		maxAge: 60 * 60 * 24, // 1 day
	}
);
