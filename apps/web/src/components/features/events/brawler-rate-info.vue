<script setup lang="ts">
import type { BrawlApiEvent } from "@brawltracker/brawlify-api";
import type { BrawlApiBrawlerWithOnlyImages } from "$server/utils/get-brawler-images";

const props = defineProps<{ event: BrawlApiEvent; images: Record<string, BrawlApiBrawlerWithOnlyImages> }>();

const slicedBrawlerStats = computed(() => props.event.map.stats.slice(0, 5));
</script>

<!-- eslint-disable vue/no-v-for-template-key-on-child -->

<template>
	<div v-for="brawlerStat in slicedBrawlerStats" :key="brawlerStat.brawler">
		<div class="flex flex-col items-center justify-center">
			<NuxtImg
				:src="images[brawlerStat.brawler]?.imageUrl2"
				width="25"
				height="25"
				class="rounded-md"
				format="webp"
			/>
		</div>
	</div>
</template>
