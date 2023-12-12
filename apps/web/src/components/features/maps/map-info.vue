<script setup lang="ts">
import type { BrawlApiMap } from "@brawltracker/brawl-api";
import { Image } from "@unpic/vue";
import { format } from "date-fns";
import { Clock, Dices } from "lucide-vue-next";
import { secondsToDate } from "$lib/util/common";

defineProps<{
	map: BrawlApiMap;
	mapIsActive: boolean;
}>();
</script>

<template>
	<div class="flex flex-col lg:sticky lg:top-24">
		<div class="top-24 flex flex-col justify-start lg:sticky">
			<div class="flex max-w-max flex-col gap-4">
				<div class="flex flex-row gap-4">
					<Image
						:src="map.gameMode.imageUrl"
						width="80"
						height="80"
						class="!h-[min-content] bg-contain !object-contain"
					/>
					<div class="flex flex-col">
						<h2 class="whitespace-nowrap text-3xl font-bold tracking-tight">
							{{ map.name }}
						</h2>
						<p class="flex flex-row items-center gap-1.5 text-muted-foreground">
							<Dices class="h-4 w-4 text-muted-foreground" />
							{{ map.gameMode.name }}
						</p>
						<p class="flex flex-row items-center gap-1.5 text-muted-foreground">
							<Clock class="h-4 w-4 text-muted-foreground" />
							<template v-if="!mapIsActive">
								Last seen {{ format(secondsToDate(map.lastActive), "d'd' k'h' 'ago'") }}
							</template>
							<template v-else>Currently in rotation</template>
						</p>
					</div>
				</div>
			</div>

			<div class="top-48 mt-5 flex flex-col gap-0 overflow-hidden rounded bg-card shadow lg:sticky">
				<!-- max-w-max is to prevent absolute button from following the flexbox's span -->
				<div class="relative max-w-max">
					<MapsMapViewDialog :map="map" />
					<NuxtImg
						:src="map?.imageUrl"
						width="300"
						height="450"
						class="block rounded-t bg-muted"
						format="webp"
						:modifiers="{ trim: '100' }"
					/>
				</div>
				<div
					class="flex w-[300px] flex-row justify-between rounded-b border border-t-0 border-border px-3 py-2"
				>
					<div class="text-sm font-medium text-muted-foreground">
						Concept by
						<p class="inline-block text-foreground underline">{{ map.credit ?? "Brawl Stars Devs" }}</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
