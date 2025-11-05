<script setup lang="ts">
import { numberToRomanNumerals } from "$lib/utils/common/numbers";

const route = useRoute("players-tag");

useSeoMeta({
	title: `Player Profile`,
});

const { data: player, suspense: playerSuspense } = useQuery(playersDetailQuery(route.params.tag));
await playerSuspense();

const { data: brawlers, suspense: brawlersSuspense } = useQuery(brawlersQuery());
await brawlersSuspense();

if (!player.value) {
	throw createError({ statusCode: 404, message: "Player not found", fatal: true });
}

const seasonReset = computed(() => {
	const { brawlers } = player.value!;
	const trophies = brawlers.reduce((acc, brawler) => {
		if (brawler.trophies > 1000) return acc + 1000;
		return acc + brawler.trophies;
	}, 0);

	const seasonTrophiesGained = player.value!.trophies - trophies;

	return {
		trophiesAfterReset: trophies,
		seasonTrophiesGained,
	};
});

const trophyBox = computed(() => {
	if (!player.value) return;
	const seasonTrophiesGained = seasonReset.value.seasonTrophiesGained;
	// Small Trophy Box: 0 Season Trophies
	// Big Trophy Box: 100 Season Trophies
	// Mega Trophy Box: 400 Season Trophies
	// Omega Trophy Box: 1000 Season Trophies
	// Ultra Trophy Box: 3000 Season Trophies

	if (seasonTrophiesGained >= 3000) {
		return {
			name: "Ultra Trophy Box",
			image: "/icons/player/trophy-boxes/ultra-trophy-box.png",
			color: "text-cyan-500! dark:text-cyan-400!",
		};
	} else if (seasonTrophiesGained >= 1000) {
		return {
			name: "Omega Trophy Box",
			image: "/icons/player/trophy-boxes/omega-trophy-box.png",
			color: "text-red-500! dark:text-red-400!",
		};
	} else if (seasonTrophiesGained >= 400) {
		return {
			name: "Mega Trophy Box",
			image: "/icons/player/trophy-boxes/mega-trophy-box.png",
			color: "text-fuchsia-500! dark:text-fuchsia-400!",
		};
	} else if (seasonTrophiesGained >= 100) {
		return {
			name: "Big Trophy Box",
			image: "/icons/player/trophy-boxes/big-trophy-box.png",
			color: "text-blue-500! dark:text-blue-400!",
		};
	} else {
		return {
			name: "Small Trophy Box",
			image: "/icons/player/trophy-boxes/small-trophy-box.png",
			color: "text-green-500! dark:text-green-400!",
		};
	}
});

 
const { format } = new Intl.NumberFormat("en-US");

const playerStats = [
	{
		stat: "Trophies",
		value: format(player.value!.trophies),
		image: { src: "/icons/player/trophy.webp" },
		color: "text-(--ui-primary)! dark:text-(--ui-primary)-400!",
	},
	{
		stat: "Highest Trophies",
		value: format(player.value!.highestTrophies),
		image: { src: "/icons/player/highest-trophies.png" },
		color: "text-blue-500! dark:text-blue-400!",
	},
	{
		stat: "Trophies After Reset",
		value: format(seasonReset.value.trophiesAfterReset),
		image: { src: "/icons/player/season-trophy.png" },
		color: "text-cyan-500! dark:text-cyan-400!",
	},
	{
		stat: "Season Trophies Gained",
		value: format(seasonReset.value.seasonTrophiesGained),
		image: { src: "/icons/player/season-trophy.png" },
		color: "text-cyan-500! dark:text-cyan-400!",
	},
	{
		stat: "Trophy Box",
		value: `${trophyBox.value!.name}`,
		valueImage: { src: trophyBox.value!.image },
		image: { src: "/icons/player/trophy-boxes/trophy-box-pin.png" },
		color: trophyBox.value!.color,
	},
	{
		stat: "Level",
		value: player.value!.expLevel,
		image: { src: "/icons/player/player-level.png" },
		color: "text-sky-500! dark:text-sky-400!",
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
		image: { src: "/icons/player/3v3.png" },
		color: "text-rose-500! dark:text-rose-400!",
	},
	{
		stat: "Solo Showdown Victories",
		value: format(player.value!.soloVictories),
		image: { src: "/icons/player/solo.png" },
		color: "text-green-500! dark:text-green-400!",
	},
	{
		stat: "Duo Showdown Victories",
		value: format(player.value!.duoVictories),
		image: { src: "/icons/player/duo.png" },
		color: "text-emerald-500! dark:text-emerald-400!",
	},
	{
		stat: "Highest Robo Rumble Level",
		value: roboRumbleLevel.value,
		image: { src: "/icons/player/robo-rumble.webp" },
		color: "text-red-500! dark:text-red-400!",
	},
	{
		stat: "Qualified from Championship Challenge",
		value: player.value?.isQualifiedFromChampionshipChallenge ? "Qualified" : "Not Qualified",
		image: { src: "/icons/player/bs-cup-challenge.png" },
		color: "text-orange-500! dark:text-orange-400!",
	},
	{
		stat: "Brawler Progress",
		value: `${player.value!.brawlers.length}/${brawlers.value!.length} Brawlers`,
		image: { src: "/icons/player/unlocked.png" },
		color: "text-green-500! dark:text-green-400!",
		// valueRender: () =>
		// 	h(UProgress, {
		// 		value: player.value!.brawlers.length,
		// 		max: brawlers.value!.list.length,
		// 		class: "text-(--ui-primary)-500! dark:text-(--ui-primary)-400!",
		// 	}),
	},
];
</script>

<template>
	<UiPageSection
		class="divide-y-0"
		title="General Stats"
		description="General information about the player"
		orientation="vertical"
	>
		<div class="pt-0!">
			<PlayersStatTable title="Player Stats" class="mb-4 flex w-full flex-col lg:hidden lg:w-[25%]" :stats="playerStats" />
			<div class="flex flex-col gap-4 md:flex-row">
				<PlayersStatTable title="Player Stats" class="hidden w-full flex-col lg:flex lg:w-[35%]" :stats="playerStats" />
				<PlayersStatTable title="Record Stats" class="flex w-full flex-col lg:w-[40%]" :stats="recordStats" />
				<PlayersRankedStatsTable class="flex w-full flex-col lg:w-[25%]" />
			</div>
		</div>
	</UiPageSection>
	<UiPageSection
		class="divide-y-0"
		title="Trophy Graph"
		description="View the player's trophy's change over their trophy road battle log"
		orientation="vertical"
	>
		<div class="pt-0!">
			<NuxtErrorBoundary>
				<PlayersTrophyGraph :player="player!" />
				<template #error="{ error }">
					<UAlert
						variant="subtle"
						color="error"
						icon="i-heroicons-exclamation-triangle"
						title="An error occured when loading the graph"
						:description="error.message"
					/>
				</template>
			</NuxtErrorBoundary>
		</div>
	</UiPageSection>
	<UiPageSection
		class="divide-y-0 pb-8"
		title="Brawler Progress"
		description="View the players progress on brawlers and their accessories"
		orientation="vertical"
	>
		<div class="pt-0!">
			<PlayersProgression :player="player!" :brawlers="brawlers!" />
		</div>
	</UiPageSection>
</template>
