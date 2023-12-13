import type { BrawlApiBrawler } from "@brawltracker/brawl-api";
import { groupBy } from "$lib/util/common";

export type GroupingMode = "class" | "none" | "rarity";

export const GROUPING_MODES: GroupingMode[] = ["none", "rarity", "class"];

export const useBrawlersStore = defineStore("brawlers-store", () => {
	const ungroupedBrawlers = ref<BrawlApiBrawler[]>([]);
	const groupingMode = ref<GroupingMode>("none");
	const search = ref<string>("");

	const brawlers = computed(() => {
		const brawlers = ungroupedBrawlers.value.filter((brawler) =>
			brawler.name.toLowerCase().includes(search.value.toLowerCase())
		);
		if (groupingMode.value === "none") return brawlers;
		if (groupingMode.value === "rarity") {
			return groupBy(brawlers, (brawler) => brawler.rarity.name);
		}

		if (groupingMode.value === "class") {
			return groupBy(brawlers, (brawler) => brawler.class.name);
		}
	});

	async function fetchBrawlers() {
		const { data } = await useFetch("/api/brawlers", { server: true });
		ungroupedBrawlers.value = data.value!;
	}

	return {
		brawlers,
		groupingMode,
		search,
		fetchBrawlers,
	};
});
