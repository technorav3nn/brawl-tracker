<script setup lang="ts">
import type { BrawlApiBrawler, BrawlApiMapBrawlerStats } from "@brawltracker/brawl-api";

const props = defineProps<{
	brawlerStats: BrawlApiMapBrawlerStats;
	brawler: BrawlApiBrawler;
}>();
const brawlerInfo = computed(() => props.brawlerStats);
</script>

<template>
	<div v-if="brawler" class="rounded border border-border bg-card shadow dark:shadow-none">
		<NuxtImg
			:src="brawler!.imageUrl2"
			height="100"
			width="100"
			class="rounded rounded-b-none border-b object-cover object-top"
		/>
		<div class="flex justify-center">
			<p class="px-1.5 pt-1 text-sm font-semibold">{{ brawler?.name }}</p>
		</div>
		<div class="flex flex-col px-1.5 py-1">
			<div class="flex flex-row justify-between">
				<p class="text-sm font-medium text-muted-foreground">Win</p>
				<p class="text-sm font-semibold text-primary">{{ brawlerInfo.winRate }}%</p>
			</div>
			<div class="flex flex-row justify-between">
				<p class="text-sm font-medium text-muted-foreground">Use</p>
				<p class="text-sm font-semibold text-primary">{{ brawlerInfo.useRate }}%</p>
			</div>
		</div>
	</div>
</template>
