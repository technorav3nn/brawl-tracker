<script setup lang="ts">
import type { BrawlApiBrawler, BrawlApiMap } from "@brawltracker/brawl-api";
import { createGetCachedData } from "$lib/utils/nuxt";

const props = defineProps<{
	map: BrawlApiMap;
	brawler: BrawlApiBrawler;
}>();

const slideover = useOverlay();

// eslint-disable-next-line vue/no-setup-props-destructure
const { data: mapStats, status } = useFetch(() => `/api/maps/${props.map.id}`, {
	transform: (d) => d!.stats.find((stat) => (stat.brawler as unknown as number) === props.brawler.id) ?? null,
	getCachedData: createGetCachedData(useNuxtApp()),
	key: `maps-${props.map.id}-${props.brawler.id}`,
});
</script>

<template>
	<USlideover :title="map.name" :ui="{ content: 'max-w-sm' }">
		<template #title>
			<div class="flex flex-row items-center gap-2">
				<NuxtImg width="30" height="30" :src="map.gameMode.imageUrl" />
				<p class="flex min-w-0 items-center gap-x-1.5 font-semibold text-gray-900 dark:text-white">{{ map.name }}</p>
			</div>
		</template>
		<template #body>
			<div class="flex flex-col gap-2">
				<NuxtImg
					:src="map.imageUrl"
					:width="map.gameMode.name.includes('5v5') || map.gameMode.name.includes('Showdown') ? 468 : 290"
					class="self-center"
					height="468"
				/>
				<div v-if="status === 'success' && Boolean(mapStats)" class="mb-2 space-y-4">
					<div class="flex flex-row gap-2">
						<NuxtImg class="object-none" fit="inside" width="45" height="45" :src="brawler.imageUrl" :alt="brawler.name" />
						<div class="flex flex-col">
							<div class="flex flex-col gap-1">
								<div class="flex flex-row gap-1">
									<p class="font-semibold text-gray-900 dark:text-white">{{ brawler.name }}'s Win Rate:</p>
									<p class="text-gray-900 dark:text-white">{{ mapStats!.winRate }}%</p>
								</div>
							</div>
							<div class="flex flex-col gap-1">
								<div class="flex flex-row gap-1">
									<p class="font-semibold text-gray-900 dark:text-white">{{ brawler.name }}'s Use Rate:</p>
									<p class="text-gray-900 dark:text-white">{{ mapStats!.useRate }}%</p>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div v-if="status === 'pending'" class="flex items-center justify-center gap-2">
					<UiLoadingIndicator />
					<p class="text-lg text-gray-500 dark:text-gray-400">Loading...</p>
				</div>
				<div v-if="!mapStats && status === 'success'">
					<p class="text-sm text-gray-500 dark:text-gray-400">No stats for {{ brawler.name }} found for this map.</p>
				</div>
			</div>
		</template>
		<template #footer>
			<div class="flex w-full flex-col gap-2">
				<UButton
					:to="`/maps/${map.id}`"
					block
					icon="i-heroicons-arrow-top-right-on-square-20-solid"
					@click="slideover.close(slideover.overlays[0].id)"
				>
					View Map
				</UButton>
				<p class="text-sm text-gray-500 dark:text-gray-400">
					Stats are collected by
					<NuxtLink to="https://brawlify.com" target="_blank" class="text-(--ui-primary)-500 dark:text-(--ui-primary)-400">
						Brawlify
					</NuxtLink>
				</p>
			</div>
		</template>
	</USlideover>
</template>
