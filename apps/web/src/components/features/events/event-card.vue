<script setup lang="ts">
import type { BrawlApiEvent } from "@brawltracker/brawl-api";
import { DurationFormatter } from "@sapphire/duration";
import { Image } from "@unpic/vue";
import { ChevronRight, Clock } from "lucide-vue-next";
import { FORMATTER_UNITS } from "$lib/util/common";
import type { BrawlApiBrawlerWithOnlyImages } from "$server/utils/get-brawler-images";

defineProps<{
	event: BrawlApiEvent;
	images: Record<string, BrawlApiBrawlerWithOnlyImages>;
	type: "upcoming" | "current";
}>();

const formatter = new DurationFormatter(FORMATTER_UNITS);
</script>

<template>
	<div class="relative flex flex-col overflow-hidden rounded-md bg-card shadow dark:shadow-none">
		<NuxtLink
			class="absolute inset-0 z-30"
			:to="`/modes/${event.map.gameMode.id}?realName=${encodeURIComponent(event.map.gameMode.hash)}`"
		/>
		<div class="sr-only">View Mode ({{ event.map.gameMode.name }})</div>

		<div class="relative">
			<NuxtImg
				:src="event.map.environment.imageUrl"
				:alt="event.map.name"
				height="100"
				width="500"
				class="h-full w-full object-cover object-top"
				format="webp"
			/>
		</div>
		<div class="flex flex-row items-center justify-between border border-t-0 border-border px-3 py-2">
			<div class="flex w-full flex-row justify-start gap-2">
				<Image
					:src="event.map.gameMode.imageUrl"
					priority
					width="40"
					height="40"
					class="-ml-1.5 h-10 w-10 self-center bg-contain object-contain"
				/>
				<div class="flex flex-1 flex-col">
					<h1 class="text-lg font-bold uppercase leading-snug">
						{{ event.map.gameMode.name }}
					</h1>
					<div class="flex flex-col justify-between xs:flex-row">
						<p
							class="overflow-hidden text-ellipsis whitespace-nowrap text-sm font-medium text-muted-foreground"
						>
							{{ event.map.name }}
						</p>
						<div class="flex flex-row items-center gap-1">
							<Clock class="hidden h-3.5 w-3.5 text-muted-foreground lg:block" />
							<p class="text-sm font-medium text-muted-foreground">
								{{ type === "current" ? "ends" : "starts" }} in
								{{
									formatter.format(
										new Date(type === "current" ? event.endTime : event.startTime).valueOf() - Date.now(),
										2,
										{ left: "" }
									)
								}}
							</p>
						</div>
					</div>
				</div>
			</div>
			<!-- 
				<div class="flex items-center justify-end">
				<NuxtImg
					:src="event.map.gameMode.imageUrl"
					width="50"
					height="50"
					fit="contain"
					loading="eager"
					preload
				/>
			</div> 
		-->
		</div>
		<div class="flex flex-row justify-between rounded-b-md border border-t-0 border-border p-2">
			<div class="flex flex-row items-center justify-start gap-1">
				<EventsBrawlerRateInfo :event="event" :images="images" />
			</div>
			<NuxtLink
				class="pointer-events-auto z-30 flex flex-row items-center justify-end"
				:to="`/maps/${event.map.id}?realName=${encodeURIComponent(event.map.hash)}`"
			>
				<p class="mr-0.5 text-sm font-medium text-muted-foreground">View Map</p>
				<ChevronRight class="h-5 w-5 stroke-[1.5] text-muted-foreground" />
			</NuxtLink>
		</div>
		<!--
			eslint-disable
		  <div class="rounded-b-md border border-t-0 border-border px-2 py-1">
		  <p class="text-sm text-muted-foreground">ends in 1d 22h</p>
		  </div> -->
	</div>
</template>
