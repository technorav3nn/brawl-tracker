import type { BrawlApiBrawler } from "@brawltracker/brawl-api";

export type BrawlApiBrawlerWithOnlyImages = Pick<
	BrawlApiBrawler,
	"id" | "imageUrl" | "imageUrl2" | "imageUrl3" | "name"
>;

export const getBrawlerImages = cachedFunction(
	async () => {
		const { list: brawlers } = await useBrawlifyApi().brawlers.getAllBrawlers()!;
		return brawlers.reduce(
			(acc, brawler) => {
				acc[brawler.id] = {
					id: brawler.id,
					imageUrl: brawler.imageUrl,
					imageUrl2: brawler.imageUrl2,
					imageUrl3: brawler.imageUrl3,
					name: brawler.name,
				};
				return acc;
			},
			{} as Record<string, Partial<BrawlApiBrawlerWithOnlyImages>>
		);
	},
	{
		maxAge: 60 * 60 * 24,
		swr: true,
		name: "getBrawlerImages",
	}
);
