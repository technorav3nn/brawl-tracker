import type { BrawlApiBrawler } from "@brawltracker/brawl-api";
import { groupBy } from "$/lib/utils/common";

type Mode = "Class" | "None" | "Rarity";

export const useBrawlerListStore = defineStore("brawler-list", () => {
	const search = ref("");
	const groupingMode = ref<Mode | "">("");
	const brawlers = ref<BrawlApiBrawler[]>([]);

	const groupedBrawlers = computed(() => {
		if (brawlers.value?.length === 0) return [];
		const searchedBrawlers = brawlers.value.filter((brawler) => brawler.name.toLowerCase().includes(search.value.toLowerCase()));
		if (groupingMode.value === "None" || groupingMode.value === "") return searchedBrawlers;
		if (groupingMode.value === "Rarity") {
			return groupBy(searchedBrawlers, (brawler) => brawler.rarity.name);
		}

		if (groupingMode.value === "Class") {
			return groupBy(searchedBrawlers, (brawler) => brawler.class.name);
		}
	});

	return {
		setBrawlers: (newBrawlers: BrawlApiBrawler[]) => (brawlers.value = newBrawlers),
		search,
		groupedBrawlers,
		groupingMode,
	};
});

if (import.meta.hot) {
	import.meta.hot.accept(acceptHMRUpdate(useBrawlerListStore, import.meta.hot));
}
