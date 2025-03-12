<script setup lang="ts">
useSeoMeta({
	title: "Brawlers",
	ogTitle: "Brawlers",
});

const route = useRoute("players-tag-brawlers");

const { data: player } = await useFetch("/api/players", {
	query: { tag: route.params.tag },
	key: `players-${route.params.tag}-2`,
});
const { data: brawlers } = await useFetch("/api/brawlers", {
	key: "brawlers-2",
});

const sort = ref<"Level" | "Name" | "Rank" | "Trophies">("Trophies");
const sortDirection = ref<"ascending" | "descending">("descending");

const sortedBrawlers = useSorted(player.value!.brawlers, (a, b) => {
	if (sort.value === "Name") {
		if (sortDirection.value === "ascending") return b.name.localeCompare(a.name);
		if (sortDirection.value === "descending") return a.name.localeCompare(b.name);
	} else if (sort.value === "Level") {
		if (sortDirection.value === "ascending") return a.power - b.power;
		if (sortDirection.value === "descending") return b.power - a.power;
	} else if (sort.value === "Trophies") {
		if (sortDirection.value === "ascending") return a.trophies - b.trophies;
		if (sortDirection.value === "descending") return b.trophies - a.trophies;
	} else if (sort.value === "Rank") {
		if (sortDirection.value === "ascending") return a.rank - b.rank;
		if (sortDirection.value === "descending") return b.rank - a.rank;
	}

	return 0;
});
const search = ref("");
const searchedAndSortedBrawlers = useArrayFilter(sortedBrawlers, (b) =>
	b.name.toLowerCase().includes(search.value.toLowerCase())
);

const ownedBrawlers = computed(() => {
	return brawlers.value!.list.filter((brawler) => player.value!.brawlers.some((owned) => owned.id === brawler.id));
});
</script>

<template>
	<UDashboardSection
		v-if="player && brawlers"
		class="divide-y-0"
		:title="`Brawlers &nbsp;(${ownedBrawlers!.length} / ${brawlers!.list.length})`"
		description="Select one of the players brawlers to view their stats"
		orientation="vertical"
		:ui="{ inner: 'w-full [&>div]:w-full! ' }"
	>
		<template #description>
			<div class="flex flex-col sm:flex-row gap-4 justify-between w-full items-start">
				<p class="text-gray-400 text-sm">Select one of the players brawlers to view their stats</p>
				<div class="flex gap-3 max-sm:w-full">
					<UButtonGroup size="sm" class="max-sm:w-[60%] sm:min-w-30">
						<UInput v-model="search" class="max-sm:w-full" size="sm" color="white" placeholder="Search..." />
						<UButton icon="i-heroicons-magnifying-glass" color="gray" />
					</UButtonGroup>
					<UButtonGroup size="sm" class="max-sm:w-[40%] min-w-20">
						<USelectMenu
							v-model="sort"
							class="max-sm:w-full"
							:options="['Trophies', 'Level', 'Rank', 'Name']"
							size="sm"
							color="white"
						/>
						<UButton
							:icon="
								sortDirection === 'ascending' ? 'i-heroicons-bars-arrow-up-20-solid' : 'i-heroicons-bars-arrow-down-20-solid'
							"
							color="gray"
							@click="sortDirection = sortDirection === 'ascending' ? 'descending' : 'ascending'"
						/>
					</UButtonGroup>
				</div>
			</div>
		</template>

		<UPageGrid
			v-if="player && brawlers"
			class="pt-7! px-[4px] sm:px-0"
			:ui="{ wrapper: 'xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-2 gap-y-12' }"
		>
			<NuxtLink
				v-for="brawler in searchedAndSortedBrawlers"
				:key="brawler.id"
				:to="`/players/${encodeURIComponent(route.params.tag)}/brawlers/${brawler.id}`"
				prefetchOn="visibility"
			>
				<PlayersPlayerBrawler :brawler="brawlers?.list.find((b) => b.id === brawler.id)!" :playerBrawler="brawler" />
			</NuxtLink>
		</UPageGrid>
	</UDashboardSection>
</template>
