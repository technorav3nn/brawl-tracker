<script setup lang="ts">
import type { BrawlApiBrawler, BrawlApiMap } from "@brawltracker/brawl-api";
import { Image } from "@unpic/vue";
import { useBrawlerStatMapsStore } from "$components/features/maps/store";

const props = defineProps<{
	selectedMap: BrawlApiMap;
	brawler: BrawlApiBrawler;
}>();

const { selectedMap: selected, selectedMapLoading } = storeToRefs(useBrawlerStatMapsStore());

const brawlerStats = computed(() => {
	return selected.value?.stats.find((s) => Number(s.brawler) === props.brawler.id) ?? null;
});
</script>

<template>
	<div v-if="!selectedMapLoading">
		<div class="sticky top-48 mx-auto mt-5 flex flex-col gap-0 rounded bg-card shadow">
			<div
				class="flex flex-row items-center justify-between rounded-t-md border border-b-0 border-border px-3 py-2"
			>
				<div class="flex w-full flex-row justify-start gap-2">
					<Image
						:src="selectedMap.gameMode.imageUrl"
						priority
						width="40"
						height="40"
						class="-ml-1.5 h-10 w-10 self-center bg-contain !object-contain"
						loading="lazy"
					/>
					<div class="flex flex-1 flex-col">
						<h1
							class="overflow-hidden text-ellipsis whitespace-nowrap text-lg font-bold uppercase leading-snug"
						>
							{{ selectedMap.name }}
						</h1>
						<div class="flex flex-col justify-between xs:flex-row">
							<p
								class="overflow-hidden text-ellipsis whitespace-nowrap text-sm font-medium text-muted-foreground"
							>
								{{ selectedMap.gameMode.name }}
							</p>
						</div>
					</div>
				</div>
			</div>
			<!-- max-w-max is to prevent absolute button from following the flexbox's span -->
			<div class="relative max-w-max border-x">
				<MapsMapViewDialog :map="selectedMap" />
				<NuxtImg
					:src="selectedMap?.imageUrl"
					width="300"
					height="350"
					class="block bg-muted"
					format="webp"
					:modifiers="{ trim: '{}' }"
				/>
			</div>
			<div
				class="flex w-[300px] flex-row justify-between rounded-b border border-t-0 border-border px-3 py-2"
			>
				<div v-if="brawlerStats?.winRate">
					<p class="text-sm font-medium text-muted-foreground">
						{{ brawler.name }}'s Win Rate:
						<span class="text-sm font-semibold dark:text-primary">{{ brawlerStats?.winRate }}%</span>
					</p>
				</div>
				<div v-else>
					<p class="text-sm font-medium text-muted-foreground">No data available</p>
				</div>
			</div>
		</div>
	</div>
</template>
