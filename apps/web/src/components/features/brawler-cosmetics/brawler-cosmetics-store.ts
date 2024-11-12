import type { BrawlerData } from "@brawltracker/cdn";

export type Skin = BrawlerData["skins"] extends (infer K)[] ? K : never & { url: string };

export const useBrawlerCosmeticsStore = defineStore("brawler-cosmetics", () => {
	const skins = ref<Skin[]>([]);
	const selectedSkin = ref<Skin | null>(null);

	return {
		setSkins: (newSkins: Skin[]) => (skins.value = newSkins),
		setSelectedSkin: (newSelectedSkin: Skin) => (selectedSkin.value = newSelectedSkin),
	};
});

if (import.meta.hot) {
	import.meta.hot.accept(acceptHMRUpdate(useBrawlerCosmeticsStore, import.meta.hot));
}
