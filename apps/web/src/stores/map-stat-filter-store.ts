import type { BrawlApiBrawler, BrawlApiMap } from "@brawltracker/brawl-api";

type SortValues = "a-z" | "win-rate-asc" | "win-rate-desc" | "z-a";
type SortOption = {
	label: string;
	value: SortValues;
};

export const SORT_OPTIONS: SortOption[] = [
	{
		label: "Win %: Asc",
		value: "win-rate-desc",
	},
	{
		label: "Win %: Desc",
		value: "win-rate-asc",
	},
	{
		label: "Alpha: A-Z",
		value: "a-z",
	},
	{
		label: "Alpha: Z-A",
		value: "z-a",
	},
];

export const useMapStatFilterStore = defineStore("use-map-stat-filter-store", () => {
	const map = ref<BrawlApiMap | null>(null);
	const brawlers = ref<BrawlApiBrawler[]>([]);

	const sort = ref<SortValues>();
	const search = ref<string>("");

	function setMap(newMap: BrawlApiMap) {
		map.value = newMap;
	}

	function setBrawlers(newBrawlers: BrawlApiBrawler[]) {
		brawlers.value = newBrawlers;
	}

	const sortedBrawlers = computed(() => {
		if (!map.value) return [];

		const stats = [...map.value.stats];

		switch (sort.value) {
			case "win-rate-desc":
				return stats.sort((a, b) => b.winRate - a.winRate);
			case "win-rate-asc":
				return stats.sort((a, b) => a.winRate - b.winRate);
			case "a-z":
				return stats.sort((a, b) => {
					const aBrawler = brawlers.value.find((br) => br.id.toString() === a.brawler.toString())!;
					const bBrawler = brawlers.value.find((br) => br.id.toString() === b.brawler.toString())!;

					return aBrawler.name.localeCompare(bBrawler.name);
				});
			case "z-a":
				return stats.sort((a, b) => {
					const aBrawler = brawlers.value.find((br) => br.id.toString() === a.brawler.toString())!;
					const bBrawler = brawlers.value.find((br) => br.id.toString() === b.brawler.toString())!;

					return bBrawler.name.localeCompare(aBrawler.name);
				});
		}
	});

	const brawlerStats = computed(() => {
		if (!map.value || !sortedBrawlers.value) return map.value?.stats;

		return sortedBrawlers.value.filter((stats) => {
			if (!search.value) return true;

			return brawlers.value
				?.find((b) => b.id.toString() === stats.brawler.toString())
				?.name.toLowerCase()
				.includes(search.value.toLowerCase());
		});
	});

	return {
		brawlerStats,
		brawlers,
		sort,
		search,
		setMap,
		setBrawlers,
		SORT_OPTIONS,
	};
});

if (import.meta.hot) {
	import.meta.hot.accept(acceptHMRUpdate(useMapStatFilterStore, import.meta.hot));
}
