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

const upcomingEvents = computed(() => events.value.upcoming);
</script>

<template>
	<div class="grid grid-cols-1 gap-4 lg:grid-cols-2">
		<EventsEventCard
			v-for="(event, index) in upcomingEvents"
			:key="event.map.id"
			v-memo="event.map.id"
			:event="event"
			:images="events.images"
			:eventIndex="index"
			type="upcoming"
		/>
	</div>
</template>
