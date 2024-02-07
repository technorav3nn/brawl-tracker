<script setup lang="ts">
import type { BrawlApiMap } from "@brawltracker/brawl-api";
import { Image } from "@unpic/vue";
import { breakpointsTailwind } from "@vueuse/core";
import { ChevronRight } from "lucide-vue-next";
import { useBrawlerStatMapsStore } from "$components/features/maps/store";

const props = defineProps<{
	map: BrawlApiMap;
}>();

const breakpoints = useBreakpoints(breakpointsTailwind);

const { setSelectedMap } = useBrawlerStatMapsStore();

async function onSelectClicked() {
	await setSelectedMap(props.map.id);
	if (breakpoints.smaller("lg").value) {
		console.log("Toggling dialog");
	}
}
</script>

<template>
	<div class="relative flex flex-col overflow-hidden rounded-md bg-card shadow dark:shadow-none">
		<div class="flex flex-row items-center justify-between rounded-t-md border border-border px-3 py-2">
			<div class="flex w-full flex-row justify-start gap-2">
				<Image
					:src="map.gameMode.imageUrl"
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
						{{ map.name }}
					</h1>
					<div class="flex flex-col justify-between xs:flex-row">
						<p
							class="overflow-hidden text-ellipsis whitespace-nowrap text-sm font-medium text-muted-foreground"
						>
							{{ map.gameMode.name }}
						</p>
					</div>
				</div>
			</div>
		</div>
		<div class="relative flex justify-center border-x">
			<NuxtImg
				:modifiers="{ trim: '{}' }"
				:src="map.imageUrl"
				:alt="map.name"
				height="300"
				width="250"
				format="webp"
				loading="lazy"
			/>
		</div>
		<div class="flex flex-row justify-between rounded-b-md border border-t border-border p-2">
			<div
				class="z-30 flex cursor-pointer flex-row items-center justify-end"
				role="button"
				@click="onSelectClicked"
			>
				<p class="mr-0.5 text-sm font-medium text-muted-foreground">Select</p>
				<ChevronRight class="h-5 w-5 stroke-[1.5] text-muted-foreground" />
			</div>
		</div>
	</div>
</template>
