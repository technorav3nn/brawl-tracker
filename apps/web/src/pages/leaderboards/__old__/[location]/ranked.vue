<script setup lang="ts">
import type { CountryCodes } from "@brawltracker/brawl-stars-api";
import { byCountry } from "country-code-lookup";

const RANK_ORDER: Record<number, string> = {
	19: "Masters",
	18: "Legendary III",
	17: "Legendary II",
	16: "Legendary I",
	15: "Mythic III",
	14: "Mythic II",
	13: "Mythic I",
	12: "Diamond III",
	11: "Diamond II",
	10: "Diamond I",
	9: "Gold III",
	8: "Gold II",
	7: "Gold I",
	6: "Silver III",
	5: "Silver II",
	4: "Silver I",
	3: "Bronze III",
	2: "Bronze II",
	1: "Bronze I",
};

const RANK_TO_IMAGES: Record<string, string> = (() => {
	const rankTiers = ["I", "II", "III"];
	const ranksWithTiers = ["Bronze", "Silver", "Gold", "Diamond", "Mythic", "Legendary"];

	return ranksWithTiers.reduce(
		(acc, rank) => {
			const images = rankTiers.map((tier) => {
				const rankName = `${rank} ${tier}`;
				const imageUrl = `/icons/ranked/${rank.toLowerCase()}.png`;
				return [rankName, imageUrl];
			});
			return { ...acc, ...Object.fromEntries(images) };
		},
		{
			Masters: "/icons/ranked/masters.png",
		}
	);
})();

function convertShortEloToActual(elo: string) {
	return Number.parseInt(elo, 10) * 1_000;
}

const ELO_STRING_MAX_LENGTH = 4;
function getRankAndElo(trophies: number) {
	const trophiesString = trophies.toString();
	if (trophiesString.length > ELO_STRING_MAX_LENGTH) {
		throw new Error("Elo string is too long");
	}

	const [rankNumber, elo] = [trophiesString.slice(0, 2), convertShortEloToActual(trophiesString.slice(2))];
	const rank = RANK_ORDER[Number.parseInt(rankNumber, 10)];
	return { rank, elo, rankNumber };
}

const longLocation = decodeURIComponent(
	useRoute("leaderboards-location-ranked").params.location as CountryCodes
);

const location = byCountry(longLocation)?.iso2;

const { data: seasons } = await useFetch("/api/leaderboards/ranked-seasons", {
	transform: (d) => d.map((s) => ({ ...s, seasonText: `Season ${s.id}` })),
});
const season = ref(seasons.value![seasons.value!.length - 1]);
const params = computed(
	() =>
		// eslint-disable-next-line n/prefer-global/url-search-params
		new URLSearchParams({ location: location!, seasonId: (season.value.id + 100).toString(), type: "ranked" })
);
const { data: leaderboard, status } = await useFetch(() => `/api/leaderboards?${params.value.toString()}`, {
	watch: [season],
	key: season.value.id.toString(),
});

const pageCount = 10;
const page = ref(1);
const query = ref("");
const sort = ref({
	column: null,
	direction: "asc",
});

const rows = computed(() => {
	if (status.value === "pending") return [];
	return leaderboard.value
		?.map((player, index) => {
			const { elo, rank, rankNumber } = getRankAndElo(player.trophies);
			return {
				name: player.name,
				rank,
				rankPoints: elo,
				rankNumber,
				index: index + 1,
			};
		})
		.sort((a, b) => {
			if (sort.value.column && sort.value.column === "rankPoints") {
				const column = sort.value.column;
				const direction = sort.value.direction === "asc" ? 1 : -1;
				if (a[column] < b[column]) return -1 * direction;
				if (a[column] > b[column]) return Number(direction);
				return 0;
			}

			if (sort.value.column === "rank") {
				const { rankNumber: rankNumberA } = a;
				const { rankNumber: rankNumberB } = b;
				const direction = sort.value.direction === "asc" ? 1 : -1;

				if (rankNumberA < rankNumberB) return -1 * direction;
				if (rankNumberA > rankNumberB) return Number(direction);
				return 0;
			}

			if (sort.value.column === "index") {
				const direction = sort.value.direction === "asc" ? 1 : -1;
				if (a.index < b.index) return -1 * direction;
				if (a.index > b.index) return Number(direction);
			}

			return 0;
		})
		.filter((row) => {
			if (!query.value) return true;
			return Object.values(row).some((value) => {
				if (typeof value === "string") {
					return value.toLowerCase().includes(query.value.toLowerCase());
				}

				return false;
			});
		})
		.slice((page.value - 1) * pageCount, page.value * pageCount);
});

const columns = [
	{
		key: "index",
		label: "Placement",
		sortable: true,
	},
	{
		key: "name",
		label: "Name",
	},
	{
		key: "rank",
		label: "Rank",
		sortable: true,
	},
	{
		key: "rankPoints",
		label: "Rank Points",
		sortable: true,
	},
];
</script>

<template>
	<div v-if="leaderboard" class="flex flex-col justify-center items-center">
		<div class="w-full">
			<div class="flex py-3.5 justify-between">
				<UInput v-model="query" placeholder="Filter..." />
				<LeaderboardsLocationSelectMenu />
				<USelectMenu v-model="season" :options="seasons!" optionAttribute="seasonText" valueAttriubte="id" />
			</div>
			<UTable
				v-model:sort="sort"
				:loading="status === 'pending'"
				:loading-state="{
					icon: 'i-heroicons-arrow-path-20-solid',
					label: 'Loading...',
				}"
				:progress="{
					color: 'primary',
					animation: 'carousel',
				}"
				class="border border-gray-200 dark:border-gray-700 rounded h-[668px]"
				:rows
				:columns
			>
				<template #name-data="{ row }">
					<p class="font-medium text-foreground">{{ row.name }}</p>
				</template>
				<template #rank-data="{ row }">
					<NuxtImg
						:src="RANK_TO_IMAGES[row.rank]"
						width="40"
						height="40"
						fit="outside"
						class="inline-block mr-2"
					/>
					<p class="font-medium text-foreground inline-block">{{ row.rank }}</p>
				</template>
			</UTable>
			<div class="flex justify-start py-3.5 border-t border-gray-200 dark:border-gray-700">
				<UPagination v-model="page" :page-count="pageCount" :total="leaderboard.length" />
			</div>
		</div>
	</div>
</template>
