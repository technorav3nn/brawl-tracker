<script setup lang="ts">
import { Box } from "$styled-system/jsx";
import PlayerTagDetails from "./_components/player-tag-details.vue";
import StatsHero from "./_components/stats-hero.vue";
</script>

<template>
	<Box
		:py="{
			base: '16',
			lg: '16',
		}"
		max-w="7xl"
		mx="auto"
		px="4"
	>
		<Box alignItems="center" display="flex" flexDir="column" textAlign="center">
			<StatsHero />
			<PlayerTagDetails />
		</Box>
	</Box>
</template>
