<script setup lang="ts">
import type { BreadcrumbItem } from "#ui/types";

const breadcrumb: BreadcrumbItem[] = [{ label: "Leaderboards", to: "/leaderboards", active: true }];
const pages = [
	{
		title: "Players",
		description: "View the player leaderboard, with people competing to have the highest trophies!",
		to: "/leaderboards/players",
		icon: "i-heroicons-users",
	},
	{
		title: "Clubs",
		icon: "i-tabler-shield-star",
		description: "View the top clubs in Brawl Stars with the most trophies!",
		to: "/leaderboards/clubs",
	},
	{
		title: "Brawlers",
		icon: "i-tabler-swords",
		description: "View the highest trophie count for every brawler in the game!",
		to: "/leaderboards/brawlers",
	},
];
</script>

<template>
	<UContainer>
		<UPageHeader class="mb-12" title="Leaderboards" description="View all the leaderboards in Brawl Stars!">
			<template #headline>
				<UBreadcrumb :links="breadcrumb" />
			</template>
		</UPageHeader>
		<UPageGrid>
			<UPageCard v-for="(page, index) in pages" :key="index" v-bind="page">
				<template #description>
					<span class="line-clamp-2">{{ page.description }}</span>
				</template>
			</UPageCard>
		</UPageGrid>
	</UContainer>
</template>
