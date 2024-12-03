<script setup lang="ts">
import { CDN_URL } from "@brawltracker/cdn";
import type { NewOffer } from "$server/api/shop/offers.get";

defineProps<{
	item: NewOffer["items"][0];
}>();
</script>

<template>
	<div class="flex items-center gap-2">
		<div class="flex gap-2 flex-col items-center">
			<p class="font-semibold inline-block">{{ item.name }}</p>
			{{ console.log(item) }}
			<NuxtImg :src="(item as any).skinName ? `${CDN_URL}${(item as any).skinName.path}` : ''" width="40" height="40" />
		</div>
	</div>
</template>
