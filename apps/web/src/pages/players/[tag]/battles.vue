<script setup lang="ts">
import type { Battlelog } from "@brawltracker/brawl-stars-api";
import { createGetCachedData } from "$lib/utils/nuxt";

const route = useRoute("players-tag");
const nuxtApp = useNuxtApp();

const { data: battlelog, status } = await useLazyFetch("/api/players/battlelog", {
	query: { tag: route.params.tag },
	key: `battlelog-${route.params.tag}`,
	getCachedData: createGetCachedData(nuxtApp),
});

const { status: brawlersStatus } = await useLazyFetch("/api/brawlers", {
	key: "brawlers",
	getCachedData: createGetCachedData(nuxtApp),
});

const { data, status: gamemodesStatus } = await useLazyFetch("/api/game-modes", {
	key: "gamemodes",
	getCachedData: createGetCachedData(nuxtApp),
	transform: (data) =>
		data.list.map((mode) => ({
			apiName: mode.scHash.includes("5v5") ? mode.scHash.replace("5v5", "5V5") : mode.scHash,
			id: (mode as any).scId,
			name: mode.name,
		})),
});

console.log(data.value);

const castBattle = (b: any) => b as unknown as Battlelog;
</script>

<template>
	<UiPageSection
		class="divide-y-0"
		title="Battlelog"
		description="View all of the past 25 battles of the player"
		orientation="vertical"
	>
		<div class="flex w-full flex-col items-center gap-5">
			<template v-if="status === 'pending' || brawlersStatus === 'pending' || gamemodesStatus === 'pending'">
				<USkeleton v-for="i in 10" :key="i" class="h-40 w-full" />
			</template>
			<template v-else-if="battlelog?.length !== 0">
				<PlayersBattlelogBattle
					v-for="battle in battlelog"
					:key="battle.battleTime"
					class="w-full"
					:battlelogEntry="castBattle(battle)"
				/>
			</template>
			<UAlert
				v-else
				class="w-full"
				variant="subtle"
				:ui="{ wrapper: 'gap-2', icon: 'size-5' }"
				icon="i-heroicons-exclamation-triangle"
				color="warning"
				title="No battles found"
				description="This player has no battles in the last 25 battles."
			/>
		</div>
	</UiPageSection>
</template>
