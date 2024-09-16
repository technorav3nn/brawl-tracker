<script setup lang="ts">
import type { BrawlApiBrawler } from "@brawltracker/brawl-api";
import { normalizeNameToCdnName, getBrawlerModelUrl, type BrawlerData } from "@brawltracker/cdn";
import { useBrawlerStore } from "./brawler-store";

const props = defineProps<{
	brawler: BrawlApiBrawler;
	brawlerCdnData: BrawlerData;
}>();

const { brawler } = toRefs(props);

const brawlerStore = useBrawlerStore();

const cdnName = computed(() => normalizeNameToCdnName(brawler.value.name));
const modelImage = computed(() => getBrawlerModelUrl(encodeURIComponent(cdnName.value)));

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
	<div class="rounded-lg border border-border p-4 shadow">
		<div class="flex h-full w-full flex-col justify-between">
			<div class="flex items-center justify-between">
				<h1 class="text-2xl font-bold tracking-tight">Overview</h1>
				<USelectMenu
					v-model="selectedLevel"
					class="min-w-24"
					:options="levelSelectOptions"
					valueAttribute="value"
					optionAttribute="label"
				/>
			</div>
			<div
				class="flex flex-col justify-between gap-3 sm:flex-col md:flex-col lg:flex-row xl:flex-col items-center"
			>
				<NuxtImg
					class="mt-2 aspect-square max-h-[300px] w-full max-w-[180px] self-center !object-scale-down"
					:src="modelImage"
					height="300"
					width="180"
					format="webp"
					fit="outside"
				/>

				<UDivider class="w-[102.8%] lg:hidden xl:block" />
				<UDivider orientation="vertical" class="h-full hidden lg:block xl:hidden" />

				<UTable
					:ui="{
						thead: 'border-b-0 hidden',
						divide: '!divide-y-0 ',
						td: {
							base: '!whitespace-normal',
							padding: 'px-2.5 py-2.5',
						},
						tr: { base: '[&_:nth-child(1)]:!text-foreground [&_:nth-child(1)]:!font-semibold' },
					}"
					:rows="stats"
					:columns="null"
					class="w-full"
				/>
			</div>
			<div class="mt-8"></div>
		</div>
	</div>
</template>
