<script setup lang="ts">
import type { ButtonProps } from "#ui/types";
import type { PageFeatureProps } from "#ui-pro/types";

const title = "BrawlBase: The Intuitive Brawl Stars Stats Site";
const description = "BrawlBase is an open-source, comprehensive statistics and utilities site for Brawl Stars.";

useSeoMeta({
	title,
	description,
});

const brawlerPageHeroFeatures: PageFeatureProps[] = [
	{
		title: "Comprehensive Info & Stats",
		description: "View every single brawler and see extensive details on all of them!",
		icon: "i-heroicons-star",
		to: "/brawlers",
	},
	{
		title: "Cosmetics & Skins",
		description: "View every single skin and cosmetic in the game, including prices, rarity, exclusitivity and more!",
		icon: "i-heroicons-swatch",
	},
	{
		title: "Tips & Tricks, Guides, Balance Changes & More",
		description: "View guides, tips and tricks, balance changes and more for every single brawler!",
		icon: "i-heroicons-book-open",
	},
];

const playerPageHeroFeatures: PageFeatureProps[] = [
	{
		title: "Search for Players",
		description: "Search by Supercell ID Handle (new!) or the simple player tag.",
		icon: "i-heroicons-users",
		to: "/players",
	},
	{
		title: "Save Your Friends",
		description: "Save your Supercell ID friends and view their profiles again later!",
		icon: "i-heroicons-user-plus",
	},
	{
		title: "View Player Stats & Progress",
		description: "View player stats and progress, including trophies, rank, brawler stats, and more!",
		icon: "i-heroicons-presentation-chart-line",
	},
];

const mainHeroLinks: ButtonProps[] = [
	{
		label: "Get Started",
		to: "/brawlers",
	},
	{ label: "Sign Up", to: "/signup", variant: "subtle", color: "neutral", trailingIcon: "i-heroicons-arrow-right" },
];

const slideOneImages = [
	"/landing/brawlers-page-light.webp",
	"/landing/player-light.webp",
	"/landing/leaderboards-brawlers-light.webp",
];
const slideTwoImages = ["/landing/club-light.webp", "/landing/club-megapig-light.webp", "/landing/player-brawler-light.webp"];
const slideThreeImages = [
	"/landing/brawl-news-light.webp",
	"/landing/brawl-news-post-light.webp",
	"/landing/settings-light.webp",
	"/landing/events-light.webp",
];
</script>

<template>
	<LandingHeroBackground class="absolute -top-px w-full shrink-0 text-(--ui-primary) transition-all" />

	<UPageHero :ui="{ container: 'py-45!' }">
		<template #title>
			<Motion
				asChild
				:initial="{ opacity: 0, y: 20 }"
				:animate="{ opacity: 1, y: 0 }"
				:transition="{ duration: 0.6, delay: 0.1 }"
			>
				<div class="mx-auto max-w-4xl *:leading-11 sm:*:leading-19">
					Explore Brawl Stars with <span class="text-(--ui-primary)">BrawlBase</span>
				</div>
			</Motion>
		</template>
		<template #description>
			<Motion
				asChild
				:initial="{ opacity: 0, y: 20 }"
				:animate="{ opacity: 1, y: 0 }"
				:transition="{ delay: 0.3, duration: 0.5 }"
			>
				<p>View players, brawlers, events and more with BrawlBase, your home for everything Brawl Stars.</p>
			</Motion>
		</template>
		<template #links>
			<Motion
				v-for="(link, index) in mainHeroLinks"
				:key="index"
				asChild
				:initial="{ opacity: 0, y: 20 }"
				:animate="{ opacity: 1, y: 0 }"
				:transition="{ delay: 0.5 + index * 0.25, duration: 0.5 }"
			>
				<UButton size="xl" v-bind="link" />
			</Motion>
		</template>

		<LazyLandingStarsBg class="h-[130%]" :starCount="350" />

		<!-- 
		<template #bottom>
			<div class="-mt-10 flex items-center justify-center">
				<UButton
					variant="outline"
					color="neutral"
					icon="i-heroicons-arrow-down0-solid"
					square
					class="pointer-events-none animate-bounce rounded-full"
					style="animation-duration: 1.2s"
				></UButton>
			</div>
		</template> 
		-->
	</UPageHero>

	<UPageSection
		title="Explore Every Brawler"
		description="BrawlBase is the best way to view every single brawler in the game, and see extensive details on all of them!"
		orientation="horizontal"
		:features="brawlerPageHeroFeatures"
		:links="[
			{
				label: 'Explore Brawlers',
				to: '/brawlers',
				trailingIcon: 'i-heroicons-arrow-right',
			},
		]"
	>
		<NuxtImg
			src="/landing/brawlers-page-hero.webp"
			width="400"
			height="500"
			alt="Illustration"
			class="w-full rounded-xl border border-(--ui-border)"
		/>
		<template #features>
			<Motion
				v-for="(feature, index) in brawlerPageHeroFeatures"
				:key="index"
				asChild
				:initial="{ opacity: 0, transform: 'translateX(-20px)' }"
				:while-in-view="{ opacity: 1, transform: 'translateY(0)' }"
				:transition="{ delay: 0.4 + 0.2 * index }"
				:in-view-options="{ once: true }"
			>
				<UPageFeature v-bind="feature" class="opacity-0" />
			</Motion>
		</template>
	</UPageSection>

	<UPageSection
		title="View Players & Friends"
		description="Search for players and view their profiles with ease!"
		orientation="horizontal"
		reverse
		:links="[
			{
				label: 'Search for a player',
				to: '/players',
				icon: 'i-heroicons-magnifying-glass-20-solid',
			},
		]"
	>
		<NuxtImg
			src="/landing/players-death_blows-hero.webp"
			width="400"
			height="420"
			alt="Death_Blows's profile, the creator of BrawlBase"
			class="w-full rounded-xl border border-(--ui-border)"
		/>
		<template #features>
			<Motion
				v-for="(feature, index) in playerPageHeroFeatures"
				:key="index"
				asChild
				:initial="{ opacity: 0, transform: 'translateX(-20px)' }"
				:while-in-view="{ opacity: 1, transform: 'translateY(0)' }"
				:transition="{ delay: 0.4 + 0.2 * index }"
				:in-view-options="{ once: true }"
			>
				<UPageFeature v-bind="feature" class="opacity-0" />
			</Motion>
		</template>
	</UPageSection>

	<USeparator />

	<UPageSection
		title="More Features that set us apart"
		description="Not satisfied? BrawlBase is the one-stop shop for everything Brawl Stars, and the features show it!"
		orientation="vertical"
	>
		<UPageGrid>
			<Motion
				asChild
				:initial="{ opacity: 0, transform: 'translateY(20px)' }"
				:while-in-view="{ opacity: 1, transform: 'translateY(0)' }"
				:transition="{ delay: 0.4 + 0.2 * 0 }"
				:in-view-options="{ once: true }"
			>
				<UPageCard
					spotlight
					title="Events & Maps"
					description="View the current and upcoming events, as well as the maps in the game!"
					icon="i-heroicons-map"
					to="/events"
				/>
			</Motion>
			<Motion
				asChild
				:initial="{ opacity: 0, transform: 'translateY(20px)' }"
				:while-in-view="{ opacity: 1, transform: 'translateY(0)' }"
				:transition="{ delay: 0.4 + 0.2 * 1 }"
				:in-view-options="{ once: true }"
			>
				<UPageCard
					spotlight
					title="Utilities"
					description="Calculators, tier lists, guides, and more! BrawlBase has it all."
					icon="i-heroicons-wrench-screwdriver"
					to="/utilities"
				/>
			</Motion>
			<Motion
				asChild
				:initial="{ opacity: 0, transform: 'translateY(20px)' }"
				:while-in-view="{ opacity: 1, transform: 'translateY(0)' }"
				:transition="{ delay: 0.4 + 0.2 * 2 }"
				:in-view-options="{ once: true }"
			>
				<UPageCard
					spotlight
					title="Brawl Stars News"
					description="View the latest news and updates from Brawl Stars, including balance changes, new brawlers, and more!"
					icon="i-heroicons-newspaper"
					to="/news"
				/>
			</Motion>
		</UPageGrid>
	</UPageSection>

	<USeparator />

	<UPageSection
		title="Open Source Forever."
		description="BrawlBase is and always will be free and open-source with (hopefully) zero ads. It's a great way to learn how to code and contribute to a project!"
		icon="i-simple-icons-github"
		:links="[
			{
				label: 'View On GitHub',
				trailingIcon: 'i-heroicons-arrow-top-right-on-square-20-solid',
				to: 'https://github.com/technorav3nn/brawl-tracker',
				target: '_blank',
				external: true,
				rel: 'noreferrer noopener',
				variant: 'subtle',
				color: 'neutral',
			},
		]"
	>
	</UPageSection>

	<USeparator />

	<UPageSection :ui="{ container: 'relative !pb-0 overflow-hidden max-w-[90rem]' }">
		<template #title>Ready to Dive In?</template>
		<template #description>
			BrawlBase is <span class="font-medium text-(--ui-primary)">the</span> hub for everything Brawl Stars, perfect as a wiki and
			companion with your gameplay<br />
			Focused on performance, speed, and ease of use, BrawlBase is the best way to view everything in Brawl Stars. See for
			yourself!
		</template>
		<template #links>
			<UButton to="/brawlers" size="lg">Discover BrawlBase</UButton>
			<UButton to="/signup" size="lg" variant="outline" trailingIcon="i-heroicons-arrow-right" color="neutral"> Sign Up </UButton>
		</template>

		<div
			class="absolute left-1/2 size-40 -translate-x-1/2 -translate-y-80 transform rounded-full blur-[250px] sm:size-50 dark:bg-(--ui-primary)"
		/>
		<LazyLandingStarsBg :starCount="400" :size="{ min: 2, max: 4 }" />

		<div aria-hidden="true" class="absolute inset-0 z-[-1] mx-4 hidden border-x border-(--ui-border) sm:mx-6 lg:mx-8 lg:block" />
		<div
			class="relative -mx-4 h-[400px] w-screen overflow-hidden border border-x-0 border-b-0 border-(--ui-border) bg-(--ui-bg-muted) sm:-mx-6 lg:mx-0 lg:w-full lg:border-x"
		>
			<UPageMarquee
				reverse
				orientation="vertical"
				:overlay="false"
				:ui="{
					root: '[--duration:40s] absolute w-[460px] -left-[100px] -top-[300px] h-[940px] transform-3d rotate-x-55 rotate-y-0 rotate-z-30',
				}"
			>
				<img
					v-for="image in slideOneImages"
					:key="image"
					loading="lazy"
					decoding="async"
					:src="image"
					width="460"
					height="258"
					:alt="image"
					class="aspect-video rounded-[calc(var(--ui-radius)*2)] border border-(--ui-border) bg-white"
				/>
			</UPageMarquee>
			<UPageMarquee
				orientation="vertical"
				:overlay="false"
				:ui="{
					root: '[--duration:40s] absolute w-[460px] -top-[400px] left-[480px] h-[1160px] transform-3d rotate-x-55 rotate-y-0 rotate-z-30',
				}"
			>
				<img
					v-for="image in slideTwoImages"
					:key="image"
					loading="lazy"
					decoding="async"
					:src="image"
					width="460"
					height="258"
					:alt="image"
					class="aspect-video rounded-[calc(var(--ui-radius)*2)] border border-(--ui-border) bg-white"
				/>
			</UPageMarquee>
			<UPageMarquee
				reverse
				orientation="vertical"
				:overlay="false"
				:ui="{
					root: 'hidden md:flex [--duration:40s] absolute w-[460px] -top-[300px] left-[1020px] h-[1060px] transform-3d rotate-x-55 rotate-y-0 rotate-z-30',
				}"
			>
				<img
					v-for="image in slideThreeImages"
					:key="image"
					:src="image"
					loading="lazy"
					decoding="async"
					width="460"
					height="258"
					:alt="image"
					class="aspect-video rounded-[calc(var(--ui-radius)*2)] border border-(--ui-border) bg-white"
				/>
			</UPageMarquee>
		</div>
	</UPageSection>

	<!-- 
	<USeparator />

	<UPageCTA
		title="Ready to dive in?"
		description="Explore BrawlBase and create an account to start your information digging adventure!"
		variant="naked"
		class="overflow-hidden"
		:links="[
			{
				label: 'Get Started',
				to: '/signup',
				trailingIcon: 'i-heroicons-arrow-right0-solid',
			},
			{
				label: 'Have an account?',
				to: '/login',
				variant: 'subtle',
				icon: 'i-heroicons-question-mark-circle',
			},
		]"
	>
		<div
			class="absolute left-1/2 size-40 -translate-x-1/2 -translate-y-80 transform rounded-full blur-[250px] sm:size-50 dark:bg-(--ui-primary)"
		/>
		<LazyLandingStarsBg />
	</UPageCTA> 
	-->

	<!-- 
		<ULandingHero
			title="The Intuitive Statistics Site"
			description="BrawlBase is an open-source, comprehensive statistics and utilities site for Brawl Stars."
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
			class="bg-linear-to-b to-gray-50 dark:to-gray-950/50 from-white dark:from-gray-900"
			title="Features"
			description="BrawlBase offers a variety of features to help you track your progress and improve your gameplay."
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
					description="Calculators, tier lists, guides, and more! BrawlBase has it all."
					to="/utilities"
				/>
			</ULandingGrid>
		</ULandingSection>
		<ULandingSection
			title="Free & Open Source Forever"
			description="BrawlBase is and always will be free and open-source with zero ads. It's a great way to learn how to code and contribute to a project!"
			class="bg-linear-to-b from-gray-50 dark:from-gray-950/50 to-white dark:to-gray-900"
			:links="openSourceLandingLinks"
		/>
		<ULandingSection
			title="What are you waiting for?"
			description="Start using BrawlBase today and enjoy the benefits of tracking your progress and improving your gameplay!"
			:links="finalLandingLinks"
			class="bg-gray-950/30 border-t border-border"
		/> 
		-->
</template>
