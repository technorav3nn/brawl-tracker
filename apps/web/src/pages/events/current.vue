<script setup lang="ts">
const { events, currentEvents } = usePassedDownEvents();
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
