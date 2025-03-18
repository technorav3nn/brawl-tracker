<script setup lang="ts">
import { CDN_URL_V2 } from "@brawltracker/cdn/v2";
import { Image } from "@unpic/vue";
import { createGetCachedData } from "$lib/utils/nuxt";

const hovered = ref(false);

const route = useRoute("players-tag");
const nuxtApp = useNuxtApp();

const { data: meowApiData, status } = await useLazyFetch(`/api/players/${route.params.tag}/meow-api`, {
	key: `players-${route.params.tag}-meow-api`,
	dedupe: "defer",
	getCachedData: createGetCachedData(nuxtApp),
	server: false,
});

const getRankUrl = (rank: number) => `${CDN_URL_V2}/brawlify/ranked/tiered/${58000000 + rank}.png`;
</script>

<template>
	<UTooltip
		v-model:open="hovered"
		:delayDuration="0"
		:text="`View Legacy Information ${!meowApiData ? '(Data not avaliable)' : ''}`"
	>
		<UPopover arrow :content="{ side: 'left', align: 'start' }">
			<UButton
				:disabled="status === 'pending' || !meowApiData"
				:loading="status === 'pending'"
				icon="i-heroicons-information-circle"
				size="md"
				class="bg-info-300! text-black dark:bg-(--ui-info)!"
				@mouseenter="hovered = true"
				@mouseleave="hovered = false"
				@click="hovered = false"
			/>
			<template #content>
				<UCard :ui="{ header: 'py-2.5! px-2.5! font-semibold', body: 'p-0!' }" class="rounded-md">
					<template #header>Legacy Account Information</template>
					<div>
						<div class="flex justify-between border-b border-(--ui-border) p-2.5!">
							<p class="text-opacity-80 text-sm font-bold">Legacy Exp Points</p>
							<p class="text-opacity-80 text-sm font-bold text-sky-500 dark:text-sky-400">{{ meowApiData?.legacyExpPoints }}</p>
						</div>
						<div class="flex items-center justify-between gap-3 border-b-0 border-(--ui-border) p-2.5!">
							<p class="text-opacity-80 text-sm font-bold">Power League Solo Highest</p>
							<!-- <p class="text-opacity-80 text-sm font-bold">{{ getRankUrl(meowApiData?.powerLeagueSoloHighestRank }})</p> -->
							<Image
								width="35"
								height="35"
								class="size-[35px] object-contain"
								:src="
									getRankUrl(
										(meowApiData?.powerLeagueSoloHighestRank ?? 0) === 0 ? 0 : meowApiData!.powerLeagueSoloHighestRank! - 1
									)
								"
							/>
						</div>
					</div>
				</UCard>
			</template>
		</UPopover>
	</UTooltip>
</template>
