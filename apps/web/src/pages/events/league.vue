<script setup lang="ts">
const { events, currentEvents } = usePassedDownEvents();
</script>

<template>
	<!-- eslint-disable-next-line vue/no-multiple-template-root -->
	<EventsEventCard
		v-for="(event, index) in currentEvents"
		:key="event.map.id"
		v-memo="event.map.id"
		:event="event"
		:images="events.images"
		:eventIndex="index"
		type="upcoming"
	/>
</template>
