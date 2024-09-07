import type { BrawlApiBrawler } from "@brawltracker/brawl-api";
import type { BrawlerData } from "@brawltracker/cdn";

export const useBrawlerStore = defineStore("brawler-store", () => {
	const level = ref(11);
	const brawler = ref<BrawlApiBrawler | null>(null);
	const brawlerCdnData = ref<BrawlerData | null>(null);

	return {
		level,
		setLevel: (newLevel: number) => (level.value = newLevel),
		brawler,
		setBrawler: (newBrawler: BrawlApiBrawler) => (brawler.value = newBrawler),
		brawlerCdnData,
		setBrawlerCdnData: (newBrawlerCdnData: BrawlerData) => (brawlerCdnData.value = newBrawlerCdnData),
	};
});
