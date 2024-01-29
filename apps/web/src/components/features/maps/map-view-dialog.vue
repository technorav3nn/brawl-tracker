<script setup lang="ts">
import type { BrawlApiMap } from "@brawltracker/brawl-api";
import { ZoomIn } from "lucide-vue-next";

defineProps<{
	map: BrawlApiMap;
}>();
</script>

<template>
	<UiDialog>
		<UiDialogContent class="h-[95%] max-w-3xl overflow-scroll">
			<NuxtImg width="700" height="800" fit="outside" :src="map?.imageUrl" />
		</UiDialogContent>
		<UiDialogTrigger asChild>
			<UiButton
				class="absolute bottom-1 right-1 inline-flex gap-2 transition-opacity hover:opacity-90"
				size="sm"
			>
				<ZoomIn class="h-5 w-5 stroke-[1.5]" />
				View Full Map
			</UiButton>
		</UiDialogTrigger>
	</UiDialog>
</template>
