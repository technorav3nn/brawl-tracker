<script setup lang="ts">
import { numberToRomanNumerals } from "$lib/utils/common/numbers";
import { createGetCachedData } from "$lib/utils/nuxt";

const nuxtApp = useNuxtApp();
const route = useRoute("players-tag");

const { data: player, status } = await useFetch(`/api/players`, {
	key: `players-${route.params.tag}`,
	query: { tag: route.params.tag },
	getCachedData: createGetCachedData(nuxtApp),
});
const { data: brawlers } = await useFetch("/api/brawlers", {
	key: "brawlers",
	getCachedData: createGetCachedData(nuxtApp),
	transform: (d) => d.list.filter((brawler) => brawler.released),
});

if (!player.value || status.value === "error") {
	throw createError({ statusCode: 404, message: "Player not found", fatal: true });
}

const seasonReset = computed(() => {
	const { brawlers } = player.value!;
	const trophies = brawlers.reduce((acc, brawler) => {
		if (brawler.trophies > 1000) return acc + 1000;
		return acc + brawler.trophies;
	}, 0);

	const seasonTrophiesGained = trophies - player.value!.trophies;

	return {
		trophiesAfterReset: trophies,
		seasonTrophiesGained,
	};
});

const trophyBox = computed(() => {
	if (!player.value) return;
	const { seasonTrophiesGained } = toRefs(seasonReset.value);
	if (seasonTrophiesGained.value < 100) {
		return {
			image: "/icons/player/trophy-boxes/small-trophy-box.png",
			color: "!text-green-500 dark:!text-green-400",
			name: "Small Trophy Box",
		};
	} else if (seasonTrophiesGained.value < 400) {
		return {
			image: "/icons/player/trophy-boxes/big-trophy-box.png",
			color: "!text-blue-500 dark:!text-blue-400",
			name: "Big Trophy Box",
		};
	} else if (seasonTrophiesGained.value < 1000) {
		return {
			image: "/icons/player/trophy-boxes/mega-trophy-box.png",
			color: "!text-purple-500 dark:!text-purple-400",
			name: "Mega Trophy Box",
		};
	} else {
		return {
			image: "/icons/player/trophy-boxes/ultra-trophy-box.png",
			color: "!text-yellow-500 dark:!text-yellow-400",
			name: "Ultra Trophy Box",
		};
	}
});

// eslint-disable-next-line @typescript-eslint/unbound-method
const { format } = new Intl.NumberFormat("en-US");

const playerStats = [
	{
		stat: "Trophies",
		value: format(player.value!.trophies),
		image: "/icons/player/trophy.webp",
		color: "!text-primary dark:!text-primary-400",
	},
	{
		stat: "Highest Trophies",
		value: format(player.value!.highestTrophies),
		image: "/icons/player/highest-trophies.png",
		color: "!text-blue-500 dark:!text-blue-400",
	},
	{
		stat: "Trophies After Reset",
		value: format(seasonReset.value.trophiesAfterReset),
		image: "/icons/player/season-trophy.png",
		color: "!text-cyan-500 dark:!text-cyan-400",
	},
	{
		stat: "Season Trophys Gained",
		value: format(seasonReset.value.seasonTrophiesGained),
		image: "/icons/player/season-trophy.png",
		color: "!text-cyan-500 dark:!text-cyan-400",
	},
	{
		stat: "Trophy Box",
		value: `${trophyBox.value!.name}`,
		valueImage: trophyBox.value!.image,
		image: "/icons/player/trophy-boxes/trophy-box-pin.png",
		color: trophyBox.value!.color,
	},
	{
		stat: "Level",
		value: player.value!.expLevel,
		image: "/icons/player/player-level.png",
		color: "!text-sky-500 dark:!text-sky-400",
	},
];

const roboRumbleLevel = computed(() => {
	const { bestRoboRumbleTime } = player.value!;
	switch (bestRoboRumbleTime) {
		case 0:
			return "Never Played";
		case 1:
			return "Normal";
		case 2:
			return "Hard";
		case 3:
			return "Expert";
		case 4:
			return "Master";
		case 5:
			return "Insane";
		default: {
			if (bestRoboRumbleTime > 5) return `Insane ${numberToRomanNumerals(bestRoboRumbleTime - 4)}`;
			return "Unknown";
		}
	}
});

const recordStats = [
	{
		stat: "3v3 Victories",
		value: format(player.value!["3vs3Victories"]),
		image: "/icons/player/3v3.png",
		color: "!text-rose-500 dark:!text-rose-400",
	},
	{
		stat: "Solo Showdown Victories",
		value: format(player.value!.soloVictories),
		image: "/icons/player/solo.png",
		color: "!text-green-500 dark:!text-green-400",
	},
	{
		stat: "Duo Showdown Victories",
		value: format(player.value!.duoVictories),
		image: "/icons/player/duo.png",
		color: "!text-emerald-500 dark:!text-emerald-400",
	},
	{
		stat: "Highest Robo Rumble Level",
		value: roboRumbleLevel.value,
		image: "/icons/player/robo-rumble.webp",
		color: "!text-red-500 dark:!text-red-400",
	},
	{
		stat: "Qualified from Championship Challenge",
		value: player.value?.isQualifiedFromChampionshipChallenge ? "Qualified" : "Not Qualified",
		image: "/icons/player/bs-cup-challenge.png",
		color: "!text-orange-500 dark:!text-orange-400",
	},
	{
		stat: "Brawler Progress",
		value: `${player.value!.brawlers.length}/${brawlers.value!.length}`,
		image: "/icons/player/unlocked.png",
		color: "!text-green-500 dark:!text-green-400",
		// valueRender: () =>
		// 	h(UProgress, {
		// 		value: player.value!.brawlers.length,
		// 		max: brawlers.value!.list.length,
		// 		class: "!text-primary-500 dark:!text-primary-400",
		// 	}),
	},
];
</script>

<template>
	<UDashboardSection
		class="divide-y-0"
		title="General Stats"
		description="General information about the player"
		orientation="vertical"
	>
		<div class="!pt-0">
			<div class="flex flex-col md:flex-row gap-4">
				<PlayersStatTable title="Player Stats" class="flex flex-col w-full md:w-1/2" :stats="playerStats" />
				<PlayersStatTable title="Record Stats" class="flex flex-col w-full md:w-1/2" :stats="recordStats" />
			</div>
		</div>
	</UDashboardSection>
	<UDashboardSection
		class="divide-y-0"
		title="Trophy Graph"
		description="View the player's trophy's change over their trophy road battle log"
		orientation="vertical"
	>
		<div class="!pt-0">
			<NuxtErrorBoundary>
				<PlayersTrophyGraph :player="player!" />
				<template #error="{ error }">
					<UAlert
						variant="subtle"
						color="red"
						icon="i-heroicons-exclamation-triangle"
						title="An error occured when loading the graph"
						:description="error"
					>
					</UAlert>
				</template>
			</NuxtErrorBoundary>
		</div>
	</UDashboardSection>
	<UDashboardSection
		class="divide-y-0 pb-8"
		title="Brawler Progress"
		description="View the players progress on brawlers and their accessories"
		orientation="vertical"
	>
		<div class="!pt-0">
			<PlayersProgression :player="player!" :brawlers="brawlers!" />
		</div>
	</UDashboardSection>
</template>
