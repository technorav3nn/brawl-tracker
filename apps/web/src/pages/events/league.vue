<script setup lang="ts">
const { events, leagueEvents } = usePassedDownEvents();
</script>

<template>
	<!-- eslint-disable-next-line vue/no-multiple-template-root -->
	<EventsEventCard
		v-for="(event, index) in leagueEvents"
		:key="event.map.id"
		v-memo="event.map.id"
		:event="event"
		:images="events.images"
		:eventIndex="index"
		type="current"
	/>
</template>
