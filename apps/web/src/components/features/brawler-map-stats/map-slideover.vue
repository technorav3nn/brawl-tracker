<script setup lang="ts">
import type { BrawlApiBrawler, BrawlApiMap } from "@brawltracker/brawl-api";

const props = defineProps<{
	map: BrawlApiMap;
	brawler: BrawlApiBrawler;
}>();

const { data: mapStats, status } = useFetch(() => `/api/maps/${props.map.id}`, {
	transform: (d) => d.stats.find((stat) => (stat.brawler as unknown as number) === props.brawler.id) ?? null,
});
</script>

<template>
	<UDashboardSlideover :title="map.name">
		<template #title>
			<NuxtImg width="30" height="30" :src="map.gameMode.imageUrl" />
			<p class="text-gray-900 dark:text-white font-semibold flex items-center gap-x-1.5 min-w-0">{{ map.name }}</p>
		</template>
		<div class="flex flex-col gap-2">
			<NuxtImg
				:src="map.imageUrl"
				:width="map.gameMode.name.includes('5v5') || map.gameMode.name.includes('Showdown') ? 468 : 290"
				class="self-center"
				height="468"
			/>
			<div v-if="status === 'success' && Boolean(mapStats)" class="space-y-4 mb-2">
				<div class="flex flex-row gap-2">
					<NuxtImg width="40" height="40" :src="brawler.imageUrl" :alt="brawler.name" />
					<div class="flex flex-col">
						<div class="flex flex-col gap-1">
							<div class="flex flex-row gap-1">
								<p class="text-gray-900 dark:text-white font-semibold">{{ brawler.name }}'s Win Rate:</p>
								<p class="text-gray-900 dark:text-white">{{ mapStats!.winRate }}%</p>
							</div>
						</div>
						<div class="flex flex-col gap-1">
							<div class="flex flex-row gap-1">
								<p class="text-gray-900 dark:text-white font-semibold">{{ brawler.name }}'s Use Rate:</p>
								<p class="text-gray-900 dark:text-white">{{ mapStats!.useRate }}%</p>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div v-if="status === 'pending'" class="flex items-center justify-center h-32 gap-2">
				<UiLoadingIndicator />
				<p class="text-gray-500 dark:text-gray-400 text-sm">Loading...</p>
			</div>
			<div v-if="!mapStats">
				<p class="text-gray-500 dark:text-gray-400 text-sm">No stats for {{ brawler.name }} found for this map.</p>
			</div>
		</div>
		<template #footer>
			<div class="flex flex-col w-full gap-2">
				<UButton block icon="i-heroicons-arrow-top-right-on-square-20-solid">View Map</UButton>
				<p class="text-gray-500 dark:text-gray-400 text-sm">
					Stats are collected by
					<NuxtLink to="https://brawlify.com" target="_blank" class="text-primary-500 dark:text-primary-400">Brawlify</NuxtLink>
				</p>
			</div>
		</template>
	</UDashboardSlideover>
</template>
