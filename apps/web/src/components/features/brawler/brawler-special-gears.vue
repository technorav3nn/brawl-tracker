<script setup lang="ts">
import type { BrawlApiBrawler } from "@brawltracker/brawl-api";
import { normalizeNameToCdnName, type BrawlerData, CDN_URL } from "@brawltracker/cdn";
import { typedObjectEntries } from "$lib/utils/common";

const props = defineProps<{
	brawler: BrawlApiBrawler;
	brawlerCdnData: BrawlerData;
}>();

const showSuperRareGears = ref(true);

const { data: unfilteredGears } = await useFetch("/api/brawlers/gears");
const gears = computed(() => {
	if (!unfilteredGears.value) return {};
	return Object.fromEntries(
		typedObjectEntries(unfilteredGears.value)
			.filter(([, gear]) => gear.brawlersAvaliableTo === null || gear.brawlersAvaliableTo.includes(props.brawler.id))
			.filter(([, gear]) => showSuperRareGears.value || gear.rarity !== "Super Rare")
			.sort(([, a], [, b]) => {
				if (a.rarity === "Epic") return 1;
				if (b.rarity === "Epic") return -1;
				if (a.rarity === "Mythic") return 1;
				if (b.rarity === "Mythic") return -1;
				return 0;
			})
	);
});
</script>

<template>
	<div class="flex flex-col rounded-lg border border-border shadow">
		<div class="flex flex-col p-4 py-2.5">
			<div class="flex items-center gap-3">
				<NuxtImg
					src="/icons/mythic-gear-icon.png"
					width="35"
					height="35"
					alt="Attack icon"
					fit="inside"
					class="self-center bg-contain object-cover -ml-1"
					format="webp"
				/>
				<h1 class="text-2xl font-bold tracking-tight -ml-1">Gears</h1>
			</div>
		</div>
		<div class="h-full">
			<div
				class="px-4 py-1.5 border border-border border-l-0 border-r-0 border-b-0 w-full h-full rounded rounded-b-none rounded-t-none flex flex-row gap-2.5"
			>
				<div class="mt-3 mb-3 grid grid-cols-3 gap-4 bg-card">
					<div v-for="gear in gears" :key="gear.name">
						<div class="flex flex-col gap-4 lg:flex-col">
							<div class="w-full flex flex-row items-center gap-3">
								<NuxtImg
									:src="`${CDN_URL}/gears/${normalizeNameToCdnName(gear.name)}/icon.webp`"
									class="self-center bg-contain object-cover lg:self-auto"
									width="40"
									height="40"
								/>
								<p class="text-lg font-bold tracking-tight w-full">{{ gear.name }}</p>
							</div>
							<div class="flex flex-col">
								<p class="text-sm italics text-muted-foreground">{{ gear.description }}</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
