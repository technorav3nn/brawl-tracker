<script setup lang="ts">
import { Image } from "@unpic/vue";

const route = useRoute("players-tag");
const { data: player } = await useFetch(`/api/players`, { key: `players-${route.params.tag}`, query: { tag: route.params.tag } });

const stats = [
	{
		stat: "Trophies",
		value: player.value?.trophies,
		image: "/icons/player/trophy.webp",
	},
	{
		stat: "Highest Trophies",
		value: player.value?.highestTrophies,
		image: "/icons/player/highest-trophies.png",
	},
	{
		stat: "Level",
		value: player.value?.expLevel,
		image: "/icons/player/player-level.png",
	},
	{
		stat: "Class",
		value: "Fighter",
		icon: "i-heroicons-fire",
	},
	{
		stat: "Voice Actor",
		value: "Unknown",
	},
	{
		stat: "In-game ID",
		value: "brawler.value.id",
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
		<div class="!pt-1">
			<div class="flex flex-wrap flex-row gap-4">
				<section class="flex flex-col w-1/2">
					<div class="rounded-t-md bg-inherit border border-b-0 text-center border-gray-200 dark:border-gray-800">
						<h3 class="text-foreground font-semibold text-lg py-2 px-4">Brawler Stats</h3>
					</div>
					<UTable
						:ui="{
							thead: 'border-b-0 hidden',
							divide: '!divide-y-0 ',
							td: {
								base: '!whitespace-normal',
								padding: 'py-2 px-4',
							},
							tr: { base: '[&_:nth-child(1)]:!text-foreground [&_:nth-child(1)]:!font-semibold' },
							base: 'bg-inherit',
						}"
						:rows="stats"
						:columns="[
							{ key: 'stat', label: 'Stat' },
							{ key: 'value', label: 'Value' },
						]"
						class="border border-gray-200 dark:border-gray-800 rounded-md rounded-t-none"
					>
						<template #stat-data="{ row }">
							<div class="flex flex-row gap-x-2 items-center">
								<Image v-if="row.image" :src="row.image" width="24" height="24" />
								<p class="text-foreground font-semibold text-sm">{{ row.stat }}</p>
							</div>
						</template>
					</UTable>
				</section>
			</div>
		</div>
	</UDashboardSection>
</template>
