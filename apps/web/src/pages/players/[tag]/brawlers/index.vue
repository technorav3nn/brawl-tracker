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
	<UiPageSection
		v-if="player && brawlers"
		class="divide-y-0"
		:title="`Brawlers &nbsp;(${ownedBrawlers!.length} / ${brawlers!.list.length})`"
		description="Select one of the players brawlers to view their stats"
		orientation="vertical"
		:ui="{ inner: 'w-full [&>div]:w-full! ' }"
		fullWidth
	>
		<template #description>
			<div class="flex w-full flex-col items-start justify-between gap-4 sm:flex-row">
				<p class="text-sm text-gray-400">Select one of the players brawlers to view their stats</p>
				<div class="flex gap-3 max-sm:w-full">
					<UButtonGroup class="max-sm:w-[60%] sm:min-w-30">
						<UInput v-model="search" class="max-sm:w-full" placeholder="Search..." />
						<UButton icon="i-heroicons-magnifying-glass" color="neutral" variant="subtle" />
					</UButtonGroup>
					<UButtonGroup class="min-w-30 max-sm:w-[40%]">
						<USelect v-model="sort" class="max-sm:w-full sm:min-w-30" :items="['Trophies', 'Level', 'Rank', 'Name']" />
						<UButton
							:icon="
								sortDirection === 'ascending' ? 'i-heroicons-bars-arrow-up-20-solid' : 'i-heroicons-bars-arrow-down-20-solid'
							"
							color="neutral"
							variant="subtle"
							@click="sortDirection = sortDirection === 'ascending' ? 'descending' : 'ascending'"
						/>
					</UButtonGroup>
				</div>
			</div>
		</template>

		<UPageGrid
			v-if="player && brawlers"
			class="grid-cols-2 gap-y-12 px-[4px] pt-7! sm:grid-cols-2 sm:px-0 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
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
	</UiPageSection>
</template>
