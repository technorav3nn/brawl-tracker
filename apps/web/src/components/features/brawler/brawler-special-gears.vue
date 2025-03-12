<script setup lang="ts">
import type { BrawlApiBrawler } from "@brawltracker/brawl-api";
import { normalizeNameToCdnName, CDN_URL, getAllGears } from "@brawltracker/cdn";
import type { CdnBrawler } from "@brawltracker/cdn/v2";
import { typedObjectEntries } from "$lib/utils/common";

const props = defineProps<{
	brawler: BrawlApiBrawler;
	brawlerCdnData: CdnBrawler;
}>();

const showSuperRareGears = ref(false);

// eslint-disable-next-line @typescript-eslint/promise-function-async
const { data: unfilteredGears } = await useAsyncData("gears", () => getAllGears());
const gears = computed(() => {
	if (!unfilteredGears.value) return {};
	return Object.fromEntries(
		typedObjectEntries(unfilteredGears.value)
			.filter(([, gear]) => gear.brawlersAvaliableTo === null || gear.brawlersAvaliableTo.includes(props.brawler.id))
			.filter(([, gear]) => showSuperRareGears.value || gear.rarity !== "Super Rare")
			.sort(([, a], [, b]) => {
				if (a.rarity === "Epic") return 1;
				if (b.rarity === "Epic") return -1;
				if (a.rarity === "Mythic") return 1;
				if (b.rarity === "Mythic") return -1;
				return 0;
			})
	);
});
</script>

<template>
	<UCard :ui="{ header: { padding: 'px-4! py-2.5' }, body: { base: 'h-full', padding: 'px-4! py-1.5!' } }">
		<template #header>
			<div class="flex items-center gap-3">
				<NuxtImg
					src="/icons/mythic-gear-icon.png"
					width="35"
					height="35"
					alt="Attack icon"
					fit="inside"
					class="self-center bg-contain object-cover -ml-1"
					format="webp"
				/>
				<h1 class="text-2xl font-bold tracking-tight -ml-1">Gears</h1>
			</div>
		</template>

		<div v-if="Object.keys(gears).length !== 0" class="h-full">
			<p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
				These are only Epic and Mythic Gears, every brawlers inside the game will have access to the normal Super Rare Gears.
			</p>

			<div class="mt-3 mb-3 flex flex-col gap-4">
				<div v-for="gear in gears" :key="gear.name">
					<div class="flex flex-col gap-4 lg:flex-col">
						<div class="w-full flex flex-row items-center gap-3">
							<NuxtImg
								:src="`${CDN_URL}/gears/${normalizeNameToCdnName(gear.name)}/icon.webp`"
								class="self-center bg-contain object-cover lg:self-auto"
								width="40"
								height="40"
							/>
							<p class="text-lg font-bold tracking-tight w-full">{{ gear.name }}</p>
						</div>
						<div class="flex flex-col">
							<p class="text-sm italics text-muted-foreground">{{ gear.description }}</p>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div v-else>
			<div class="flex justify-center items-center">
				<p class="mt-3 text-center text-md text-gray-500 dark:text-gray-400">This brawler doesn't have any special gears</p>
			</div>
		</div>
	</UCard>

	<!-- 
	<div class="flex flex-col rounded-lg border border-border shadow-sm">
		<div class="flex flex-col p-4 py-2.5">
			<div class="flex items-center gap-3">
				<NuxtImg
					src="/icons/mythic-gear-icon.png"
					width="35"
					height="35"
					alt="Attack icon"
					fit="inside"
					class="self-center bg-contain object-cover -ml-1"
					format="webp"
				/>
				<h1 class="text-2xl font-bold tracking-tight -ml-1">Gears</h1>
			</div>
		</div>

		<div v-if="Object.keys(gears).length !== 0" class="h-full">
			<div
				class="px-4 py-1.5 border border-border border-l-0 border-r-0 border-b-0 w-full h-full rounded-sm rounded-b-none rounded-t-none"
			>
				<p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
					These are only Epic and Mythic Gears, every brawlers inside the game will have access to the normal Super Rare Gears.
				</p>

				<div class="mt-3 mb-3 flex flex-col gap-4">
					<div v-for="gear in gears" :key="gear.name">
						<div class="flex flex-col gap-4 lg:flex-col">
							<div class="w-full flex flex-row items-center gap-3">
								<NuxtImg
									:src="`${CDN_URL}/gears/${normalizeNameToCdnName(gear.name)}/icon.webp`"
									class="self-center bg-contain object-cover lg:self-auto"
									width="40"
									height="40"
								/>
								<p class="text-lg font-bold tracking-tight w-full">{{ gear.name }}</p>
							</div>
							<div class="flex flex-col">
								<p class="text-sm italics text-muted-foreground">{{ gear.description }}</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div v-else class="pb-2">
			<div
				class="flex justify-center items-center px-4 py-1.5 border border-border border-l-0 border-r-0 border-b-0 w-full h-full rounded-sm rounded-b-none rounded-t-none"
			>
				<p class="mt-3 text-center text-md text-gray-500 dark:text-gray-400">This brawler doesn't have any special gears</p>
			</div>
		</div>
	</div> 
	-->
</template>
