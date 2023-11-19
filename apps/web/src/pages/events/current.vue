<script setup lang="ts">
import type { BrawlApiEvent } from "@brawltracker/brawl-api";
import type { BrawlApiBrawlerWithOnlyImages } from "$server/utils/get-brawler-images";

const events = computed(() => {
	const { events: _events } = useAttrs() as {
		events: {
			active: BrawlApiEvent[];
			upcoming: BrawlApiEvent[];
			images: Record<string, BrawlApiBrawlerWithOnlyImages>;
		};
	};
	return _events;
});

const currentEvents = computed(() => events.value.active);
</script>

<template>
	<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
		<EventsEventCard
			v-for="(event, index) in currentEvents"
			:key="event.map.id"
			:event="event"
			:images="events.images"
			type="current"
			:eventIndex="index"
		/>
	</div>
</template>
