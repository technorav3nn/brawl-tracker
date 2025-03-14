<script setup lang="ts">
import type { BrawlApiBrawler } from "@brawltracker/brawl-api";
import { getBrawlerModelUrl, type CdnBrawler } from "@brawltracker/cdn/v2";
import { useBrawlerStore } from "./brawler-store";

const props = defineProps<{
	brawler: BrawlApiBrawler;
	brawlerCdnData: CdnBrawler;
}>();

const { brawler } = toRefs(props);
const brawlerStore = useBrawlerStore();

const modelImage = computed(() => getBrawlerModelUrl(brawler.value.id.toString()));

const brawlerModelSize = computed(() => {
	return { width: 200, height: 400 };
});

const selectedLevel = ref(11);
watch(selectedLevel, (level) => {
	brawlerStore.level = level;
});
const levelSelectOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((level) => ({
	label: `Level ${level}`,
	value: level,
}));

const stats = computed(() => {
	const { healthByLevel, stats: brawlerStats } = props.brawlerCdnData;

	return [
		{
			title: "Health",
			value: healthByLevel[brawlerStore.level - 1],
		},
		{
			title: "Movement Speed",
			value: brawlerStats.movementspeed,
		},
		{
			title: "Rarity",
			value: brawlerStats.rarity,
		},
		{
			title: "Class",
			value: brawlerStats.class,
		},
		{
			title: "Voice Actor",
			value: brawlerStats.voiceactor ?? "Unknown",
		},
		{
			title: "In-game ID",
			value: brawler.value.id,
		},
	];
});
</script>

<template>
	<div class="rounded-lg border border-(--ui-border) p-4 shadow-sm">
		<div class="flex w-full flex-col justify-between">
			<div class="flex items-center justify-between">
				<h1 class="text-2xl font-bold tracking-tight">Overview</h1>
				<USelect
					v-model="selectedLevel"
					class="min-w-24"
					:items="levelSelectOptions"
					valueAttribute="value"
					optionAttribute="label"
				/>
			</div>
			<div class="flex w-full flex-col items-center justify-between gap-3 sm:flex-col md:flex-col xl:flex-col">
				<NuxtImg
					class="mt-2 aspect-square h-[revert-layer]! w-full self-center object-scale-down!"
					:src="modelImage"
					:height="brawlerModelSize.height"
					:width="brawlerModelSize.width"
					format="webp"
					fit="outside"
					loading="eager"
					preload
				/>

				<USeparator class="w-[102.8%] lg:hidden xl:block" />

				<UTable
					:ui="{
						thead: 'border-b-0 hidden',
						base: 'divide-y-0!',
						td: 'whitespace-normal! px-2.5 py-2.5',
						tr: '[&_:nth-child(1)]:text-(--ui-text) [&_:nth-child(1)]:font-semibold!',
					}"
					:data="stats"
					:columns="[
						{
							accessorKey: 'title',
							header: 'Stat',
						},
						{
							accessorKey: 'value',
							header: 'Value',
						},
					]"
					class="w-full!"
				>
				</UTable>
			</div>
		</div>
	</div>
</template>
