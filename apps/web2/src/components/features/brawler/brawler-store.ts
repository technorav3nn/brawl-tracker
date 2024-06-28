import type { BrawlApiBrawler } from "@brawltracker/brawl-api";

export const useBrawlerStore = defineStore("brawler-store", () => {
	const level = ref(1);
	const brawler = ref<BrawlApiBrawler | null>(null);

	return {
		level,
		setLevel: (newLevel: BrawlerLevels) => (level.value = newLevel),
		brawler,
		setBrawler: (newBrawler: BrawlApiBrawler) => (brawler.value = newBrawler),
	};
});
