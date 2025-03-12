<script setup lang="ts">
import type { BrawlApiMap } from "@brawltracker/brawl-api";
import { ModalsMapViewerModal } from "#components";

const props = defineProps<{
	map: BrawlApiMap;
}>();

const modal = useModal();

function openMapViewer() {
	modal.open(ModalsMapViewerModal, { imageUrl: props.map!.imageUrl });
}
</script>

<template>
	<UCard :ui="{ body: { padding: 'p-0!' } }" class="h-min">
		<div class="flex flex-col sm:flex-row gap-0 flex-nowrap">
			<div>
				<NuxtImg
					:src="map!.imageUrl"
					:alt="map!.name"
					class="rounded-lg rounded-r-none"
					width="260"
					height="400"
					loading="eager"
				/>
			</div>
			<div class="p-3.5 flex flex-col items-start justify-between gap-2 w-[60%] sm:gap-0">
				<div class="flex gap-2 items-center">
					<Image :src="map!.gameMode.imageUrl" :alt="map!.name" class="object-scale-down!" width="32" height="32" />
					<div class="flex flex-col">
						<h1 class="text-md font-semibold">{{ map!.name }}</h1>
						<p class="text-sm">{{ map!.gameMode.name }}</p>
					</div>
				</div>
				<div class="flex gap-2.5 flex-col w-full">
					<div class="flex flex-col">
						<p class="text-sm">
							Concept by: <span class="font-semibold">{{ map?.credit ?? "BS Devs" }}</span>
						</p>
						<p class="text-sm">
							Disabled: <span class="font-semibold">{{ map?.disabled ? "Yes" : "No" }}</span>
						</p>
						<p class="text-sm">
							Last Seen:
							<span class="font-semibold">{{ map?.lastActive ? new Date(map.lastActive).toDateString() : "???" }}</span>
						</p>
					</div>
					<UButton icon="i-heroicons-magnifying-glass-plus-20-solid" block @click="openMapViewer">View Map</UButton>
				</div>
			</div>
		</div>
	</UCard>
</template>
