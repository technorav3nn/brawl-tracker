import type { BrawlApiBrawler, BrawlApiMap } from "@brawltracker/brawl-api";

type SortValues = "a-z" | "usage-rate-asc" | "usage-rate-desc" | "win-rate-asc" | "win-rate-desc" | "z-a";
type SortOption = {
	label: string;
	value: SortValues;
};

const SORT_OPTIONS: SortOption[] = [
	{
		label: "Win %: Asc",
		value: "win-rate-asc",
	},
	{
		label: "Win %: Desc",
		value: "win-rate-desc",
	},
	{
		label: "Usage %: Asc",
		value: "usage-rate-asc",
	},
	{
		label: "Usage %: Desc",
		value: "usage-rate-desc",
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

export const useMapStore = defineStore("map-store", () => {
	const map = ref<BrawlApiMap | null>(null);
	const brawlers = ref<BrawlApiBrawler[]>([]);

	const sort = ref<SortValues>("win-rate-asc");
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
			case "win-rate-asc":
				return stats.sort((a, b) => b.winRate - a.winRate);
			case "win-rate-desc":
				return stats.sort((a, b) => a.winRate - b.winRate);
			case "usage-rate-asc":
				return stats.sort((a, b) => b.useRate - a.useRate);
			case "usage-rate-desc":
				return stats.sort((a, b) => a.useRate - b.useRate);
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
	import.meta.hot.accept(acceptHMRUpdate(useMapStore, import.meta.hot));
}
