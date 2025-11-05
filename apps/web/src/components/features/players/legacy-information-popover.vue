<script setup lang="ts">
import { CDN_URL_V2 } from "@brawltracker/cdn/v2";
import { Image } from "@unpic/vue";

const hovered = ref(false);
const route = useRoute("players-tag");
const { data: player, status } = useLazyQuery(playersRntApiDetailQuery(route.params.tag));

const highestSoloPlRank = computed(() => player.value?.stats.find((s) => s.name === "SoloPowerLeague")?.value ?? 0);
const highestTeamPlRank = computed(() => player.value?.stats.find((s) => s.name === "TeamPowerLeague")?.value ?? 0);

const getRankUrl = (rank: number) => `${CDN_URL_V2}/brawlify/ranked/tiered/${58000000 + rank}.png`;
</script>

<template>
	<ClientOnly>
		<UTooltip v-model:open="hovered" :delay-duration="0" :text="`View Other Information ${!player ? '(Data not avaliable)' : ''}`">
			<UPopover arrow :content="{ side: 'left', align: 'start' }">
				<UButton
					:disabled="status === 'pending' || !player"
					:loading="status === 'pending'"
					icon="i-heroicons-information-circle"
					size="md"
					class="bg-primary-400! text-black dark:bg-(--ui-primary)!"
					@mouseenter="hovered = true"
					@mouseleave="hovered = false"
					@click="hovered = false"
				/>
				<template #content>
					<UCard :ui="{ header: 'py-2.5! px-2.5! font-semibold', body: 'p-0!' }" class="w-72 rounded-md">
						<template #header>Legacy Account Information</template>
						<div class="flex flex-row items-center justify-center gap-3 border-b border-(--ui-border) px-2.5 py-2">
							<UIcon name="i-heroicons-information-circle" class="size-8 text-info-300 dark:text-(--ui-info)" />
							<p class="text-opacity-80 text-[0.8rem]">This data references things that are no longer in the game</p>
						</div>
						<div class="divide-y divide-(--ui-border) *:p-3">
							<div class="flex justify-between">
								<p class="text-opacity-80 text-sm font-bold">Legacy Exp Points</p>
								<p class="text-opacity-80 text-sm font-bold text-sky-500 dark:text-sky-400">
									{{ player?.stats.find((s) => s.name === "LegacyExpPoints")?.value }}
								</p>
							</div>
							<div class="flex items-center justify-between gap-3">
								<p class="text-opacity-80 text-sm font-bold">Legacy Rank 35s</p>
								<p class="text-opacity-80 text-sm font-bold text-purple-500 dark:text-purple-400">
									{{ player?.stats.find((s) => s.name === "LegacyRank35s")?.value }}
								</p>
							</div>
							<div class="flex items-center justify-between gap-3">
								<p class="text-opacity-80 text-sm font-bold">Power League Solo Highest</p>
								<!-- <p class="text-opacity-80 text-sm font-bold">{{ getRankUrl(meowApiData?.powerLeagueSoloHighestRank }})</p> -->
								<Image
									width="32"
									height="32"
									class="size-[32px] object-contain"
									:src="getRankUrl(highestSoloPlRank === 0 ? 0 : highestSoloPlRank - 1)"
								/>
							</div>
							<div class="flex items-center justify-between gap-3">
								<p class="text-opacity-80 text-sm font-bold">Power League Team Highest</p>
								<!-- <p class="text-opacity-80 text-sm font-bold">{{ getRankUrl(meowApiData?.powerLeagueSoloHighestRank }})</p> -->
								<Image
									width="32"
									height="32"
									class="size-[32px] object-contain"
									:src="getRankUrl(highestTeamPlRank === 0 ? 0 : highestTeamPlRank - 1)"
								/>
							</div>
						</div>
					</UCard>
				</template>
			</UPopover>
		</UTooltip>
	</ClientOnly>
</template>
