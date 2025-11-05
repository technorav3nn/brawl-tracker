<script setup lang="ts">
import type { BrawlApiGameMode } from "@brawltracker/brawl-api";
import type { Battlelog } from "@brawltracker/brawl-stars-api";
import { CDN_URL_V2 } from "@brawltracker/cdn/v2";
import { formatTag } from "@brawltracker/supercell-api-utils";
import { Image } from "@unpic/vue";
import { camelCaseToNormalCase } from "$lib/utils/common";

const props = defineProps<{
	battlelogEntry: Battlelog;
}>();

const { data: gamemodes, status } = useLazyQuery({
	...gameModesQuery(),
	select: (data: { list: BrawlApiGameMode[] }) =>
		data.list.map((mode) => ({
			apiName: mode.scHash.includes("5v5") ? mode.scHash.replace("5v5", "5V5") : mode.scHash,
			id: (mode as any).scId,
			name: mode.name,
		})),
});

const gamemode = computed(() =>
	gamemodes.value?.find((m) => m.apiName === (props.battlelogEntry.event.mode ?? props.battlelogEntry.battle.mode))
);

const isSoloMode = computed(() => props.battlelogEntry.battle.mode.includes("solo"));
const isDuoMode = computed(() => props.battlelogEntry.battle.mode.includes("duo"));
const isTrioMode = computed(() => props.battlelogEntry.battle.mode.includes("trio"));
const is3v3 = computed(
	() => props.battlelogEntry.battle.teams?.[0]?.length === 3 && props.battlelogEntry.battle.teams.length === 2
);
const is2v2 = computed(
	() => props.battlelogEntry.battle.teams?.[0]?.length === 2 && props.battlelogEntry.battle.teams.length === 2
);
const is5v5 = computed(
	() => props.battlelogEntry.battle.teams?.[0]?.length === 5 && props.battlelogEntry.battle.teams.length === 2
);

const result = computed(() => {
	if (props.battlelogEntry.battle.result) {
		return props.battlelogEntry.battle.result.toUpperCase();
	} else if ((props.battlelogEntry.battle as any).rank) {
		return `RANK: ${(props.battlelogEntry.battle as any).rank}`;
	} else if (props.battlelogEntry.battle.trophyChange === 0) {
		return "DRAW";
	} else {
		return (props.battlelogEntry.battle.trophyChange || 0) > 0 ? "VICTORY" : "DEFEAT";
	}
});
</script>

<template>
	<template v-if="status === 'pending'">
		<USkeleton v-for="i in 10" :key="i" class="h-40 w-full" />
	</template>
	<UCard v-else class="w-full" :ui="{ header: '!p-0 sm:!p-0 divide-y! divide-(--ui-border)!', body: '!p-0 sm:!p-0' }">
		<template #header>
			<div class="flex items-center justify-between p-2.5 px-3.5! py-[0.58rem]!">
				<p class="font-medium text-(--ui-primary)">{{ camelCaseToNormalCase(battlelogEntry.battle.type, true) }}</p>
				<div class="flex items-center">
					<UIcon name="i-heroicons-clock" class="mr-1 size-5" />
					<NuxtTime class="font-medium" relative :datetime="battlelogEntry.battleTime" />
				</div>
			</div>
			<div class="mx-auto flex h-full items-center justify-between gap-3 p-2.5 px-2.5! py-3!">
				<div class="flex flex-1 items-center">
					<Image :src="`${CDN_URL_V2}/brawlify/game-modes/regular/${gamemode?.id}.png`" width="40" height="40" />
					<div class="flex flex-col gap-1">
						<p class="text-md ml-2 leading-none font-semibold whitespace-nowrap">
							{{ gamemode?.name ?? camelCaseToNormalCase(battlelogEntry.battle.mode, true) }}
						</p>
						<p class="ml-2 text-sm leading-none whitespace-nowrap text-(--ui-text-muted)">
							{{ props.battlelogEntry.event.map }}
						</p>
					</div>
				</div>
				<div class="hidden sm:block">
					<p
						:class="[
							result === 'VICTORY'
								? 'text-green-500'
								: result === 'DEFEAT'
									? 'text-red-500'
									: result === 'DRAW'
										? 'text-blue-500 dark:text-blue-400'
										: 'text-sky-500',
						]"
						class="text-md font-semibold"
					>
						{{ result }}
					</p>
				</div>
				<div class="flex flex-1 justify-end">
					<div class="flex flex-col items-end justify-end gap-1">
						<div v-if="props.battlelogEntry.battle.type !== 'soloRanked'" class="flex items-center gap-1">
							<p class="text-md leading-none font-semibold text-amber-500 dark:text-amber-400">
								{{
									(battlelogEntry?.battle?.trophyChange || 0) > 0
										? `+${battlelogEntry.battle.trophyChange}`
										: battlelogEntry.battle.trophyChange
								}}
							</p>
							<Image src="/icons/player/trophy.webp" width="25" height="25" />
						</div>
						<p
							:class="[
								result === 'VICTORY'
									? 'text-green-500'
									: result === 'DEFEAT'
										? 'text-red-500'
										: result === 'DRAW'
											? 'text-blue-500 dark:text-blue-400'
											: 'text-sky-500',
							]"
							class="text-md font-semibold sm:hidden"
						>
							{{ result }}
						</p>
					</div>
				</div>
			</div>
		</template>
		<template v-if="isSoloMode">
			<div class="flex flex-wrap justify-center gap-4 px-1 py-3 md:gap-y-4 md:px-[18vw] lg:gap-x-6">
				<PlayersBattlelogBattlePlayer
					v-for="player in props.battlelogEntry.battle.players"
					:key="player.tag"
					class="w-[100px]"
					:player="player"
				/>
			</div>
		</template>
		<template v-else-if="isDuoMode">
			<div class="flex flex-wrap justify-center gap-x-8 gap-y-4 px-4 py-3 sm:px-[14vw]">
				<div v-for="team in props.battlelogEntry.battle.teams" :key="team[0]?.tag" class="flex flex-row gap-2">
					<PlayersBattlelogBattlePlayer v-for="player in team" :key="player.tag" class="w-[100px]" :player="player" />
				</div>
			</div>
		</template>
		<template v-else-if="isTrioMode">
			<div class="flex flex-wrap justify-center gap-x-8 gap-y-4 px-4 py-3 sm:px-[2vw] lg:px-[8vw]">
				<div v-for="team in props.battlelogEntry.battle.teams" :key="team[0]?.tag" class="flex flex-row gap-2">
					<PlayersBattlelogBattlePlayer v-for="player in team" :key="player.tag" class="w-[90px] sm:w-[100px]" :player="player" />
				</div>
			</div>
		</template>
		<template v-else-if="is5v5">
			<div class="flex w-full flex-col flex-wrap items-center gap-4 px-0 py-3 sm:px-4 lg:px-8">
				<div class="flex flex-row flex-wrap justify-center gap-4">
					<PlayersBattlelogBattlePlayer
						v-for="player in props.battlelogEntry.battle.teams![0]"
						:key="player.tag"
						:player="player"
						:is-star-player="
							!!props.battlelogEntry.battle.starPlayer &&
							formatTag(player.tag) === formatTag(props.battlelogEntry.battle.starPlayer!.tag)
						"
						:is-ranked="props.battlelogEntry.battle.type === 'soloRanked'"
						class="w-[100px]"
					/>
				</div>
				<div class="min-[850px]:size-[65px]: my-4 flex size-[45px] flex-grow items-center justify-center min-[850px]:my-0">
					<Image src="/icons/versus.png" width="65" height="65" />
				</div>
				<div class="flex flex-row flex-wrap justify-center gap-4">
					<PlayersBattlelogBattlePlayer
						v-for="player in props.battlelogEntry.battle.teams![1]"
						:key="player.tag"
						:player="player"
						:is-star-player="
							!!props.battlelogEntry.battle.starPlayer &&
							formatTag(player.tag) === formatTag(props.battlelogEntry.battle.starPlayer!.tag)
						"
						:is-ranked="props.battlelogEntry.battle.type === 'soloRanked'"
						class="w-[100px]"
					/>
				</div>
			</div>
		</template>
		<template v-else-if="is3v3 || is2v2">
			<div class="flex w-full flex-col items-center px-4 py-3 min-[850px]:flex-row lg:px-8">
				<div class="flex flex-row gap-4">
					<PlayersBattlelogBattlePlayer
						v-for="player in props.battlelogEntry.battle.teams![0]"
						:key="player.tag"
						:player="player"
						:is-star-player="
							!!props.battlelogEntry.battle.starPlayer &&
							formatTag(player.tag) === formatTag(props.battlelogEntry.battle.starPlayer!.tag)
						"
						:is-ranked="props.battlelogEntry.battle.type === 'soloRanked'"
						class="w-[80px] sm:w-[100px]"
					/>
				</div>

				<div class="min-[850px]:size-[65px]: my-4 flex size-[45px] flex-grow items-center justify-center min-[850px]:my-0">
					<Image src="/icons/versus.png" width="65" height="65" />
				</div>

				<div class="flex flex-row gap-4">
					<PlayersBattlelogBattlePlayer
						v-for="player in props.battlelogEntry.battle.teams![1]"
						:key="player.tag"
						:player="player"
						:is-star-player="
							!!props.battlelogEntry.battle.starPlayer &&
							formatTag(player.tag) === formatTag(props.battlelogEntry.battle.starPlayer!.tag)
						"
						:is-ranked="props.battlelogEntry.battle.type === 'soloRanked'"
						class="w-[80px] sm:w-[100px]"
					/>
				</div>
			</div>
		</template>
		<div v-else>
			<p class="text-md p-4 text-center font-semibold text-(--ui-text-muted)">
				Couldn't find any players for this battle. This is most likely a bug in the API.
			</p>
		</div>
	</UCard>
</template>

<style lang="css">
.grid-cols-normal {
	grid-template-columns: 1fr 1fr 1fr auto 1fr 1fr 1fr;
}
</style>
