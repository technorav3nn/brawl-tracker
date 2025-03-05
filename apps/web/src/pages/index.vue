<script setup lang="ts">
import type { Button } from "#ui/types";

const title = "BrawlTrack - The Intuitive Brawl Stars Stats Site";
const description = "BrawlTrack is an open-source, comprehensive statistics and utilities site for Brawl Stars.";
useSeoMeta({
	title,
	titleTemplate: "%s | BrawlTrack",
	description,
	ogTitle: title,
	ogDescription: description,
	ogSiteName: "BrawlTrack",
});

const heroLinks: Button[] = [
	{
		label: "Search For A Player",
		to: "/players",
		icon: "i-heroicons-magnifying-glass",
		size: "lg",
	},
	{
		label: "Leaderboards",
		to: "/leaderboards",
		icon: "i-heroicons-chart-bar",
		color: "gray",
		size: "lg",
	},
];
const openSourceLandingLinks: Button[] = [
	{
		label: "GitHub",
		to: "https://github.com/technorav3nn/brawltracker",
		icon: "i-simple-icons-github",
		color: "gray",
		size: "lg",
	},
];
const finalLandingLinks: Button[] = [
	{
		label: "View Brawlers",
		to: "/brawlers",
		icon: "i-tabler-swords",
		size: "lg",
		color: "black",
	},
	{
		label: "View Events",
		to: "/events",
		icon: "i-heroicons-map",
		color: "gray",
		size: "lg",
	},
];
</script>

<template>
	<UPage>
		<ULandingHero
			title="The Intuitive Statistics Site"
			description="BrawlTrack is an open-source, comprehensive statistics and utilities site for Brawl Stars."
			:links="heroLinks"
		>
			<template #headline>
				<UButton
					color="gray"
					to="/inbox"
					label="View the latest updates"
					trailing-icon="i-heroicons-arrow-right"
					size="sm"
					class="rounded-full"
				/>
			</template>
		</ULandingHero>
		<ULandingSection
			class="bg-gradient-to-b to-gray-50 dark:to-gray-950/50 from-white dark:from-gray-900"
			title="Features"
			description="BrawlTrack offers a variety of features to help you track your progress and improve your gameplay."
		>
			<ULandingGrid>
				<ULandingCard
					class="col-span-6"
					icon="i-tabler-swords"
					title="Brawlers"
					description="View every single brawler and see extensive details on all of them!"
					to="/brawlers"
				/>
				<ULandingCard
					class="col-span-6"
					icon="i-heroicons-map"
					title="Events & Maps"
					description="View the current and upcoming events, as well as the maps in the game!"
					to="/events"
				/>
				<ULandingCard
					class="col-span-6"
					icon="i-heroicons-users"
					title="View Players & Friends"
					description="Search for players and view their profile with ease, and save their tag to view again later!"
					to="/players"
				/>
				<ULandingCard
					class="col-span-6"
					icon="i-heroicons-wrench-screwdriver"
					title="Utilities"
					description="Calculators, tier lists, guides, and more! BrawlTrack has it all."
					to="/utilities"
				/>
			</ULandingGrid>
		</ULandingSection>
		<ULandingSection
			title="Free & Open Source Forever"
			description="BrawlTrack is and always will be free and open-source with zero ads. It's a great way to learn how to code and contribute to a project!"
			class="bg-gradient-to-b from-gray-50 dark:from-gray-950/50 to-white dark:to-gray-900"
			:links="openSourceLandingLinks"
		/>
		<ULandingSection
			title="What are you waiting for?"
			description="Start using BrawlTrack today and enjoy the benefits of tracking your progress and improving your gameplay!"
			:links="finalLandingLinks"
			class="bg-gray-950/30 border-t border-border"
		/>
	</UPage>
</template>
