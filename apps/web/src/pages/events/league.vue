<script setup lang="ts">
import type { BrawlApiEvent } from "@brawltracker/brawl-api";
import type { BrawlApiBrawlerWithOnlyImages } from "$server/utils/get-brawler-images";

const events = computed(() => {
	const { events: _events } = useAttrs() as {
		events: {
			league: BrawlApiEvent[];
			images: Record<string, BrawlApiBrawlerWithOnlyImages>;
		};
	};
	return _events;
});

const currentEvents = computed(() => events.value.league);
</script>

<template>
	<!-- eslint-disable-next-line vue/no-multiple-template-root -->
	<EventsEventCard
		v-for="(event, index) in currentEvents"
		:key="event.map.id"
		:event="event"
		:images="events.images"
		type="current"
		:eventIndex="index"
	/>
</template>
