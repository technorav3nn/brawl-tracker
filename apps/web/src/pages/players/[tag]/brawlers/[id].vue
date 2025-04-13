<script setup lang="ts">
const route = useRoute("players-tag-brawlers-id");

const { data: player, status } = await useFetch("/api/players", {
	query: { tag: route.params.tag },
	key: `players-${route.params.tag}`,
});

const playerBrawler = computed(() => {
	if (!player.value) return;
	return player.value.brawlers.find((brawler) => brawler.id.toString() === route.params.id);
});

const { data: brawler, status: brawlersStatus } = await useFetch("/api/brawlers", {});

const foundBrawler = computed(() => {
	return brawler.value!.list.find((b) => b.id.toString() === route.params.id.toString());
});

const fullStatus = computed(() => status.value === "success" && brawlersStatus.value === "success");

const title = computed(() => {
	if (!foundBrawler.value) return `Loading...`;
	return `${foundBrawler.value!.name ?? route.params.id}'s stats`;
});
const description = "View this player's brawler's stats and more";

useSeoMeta({
	title,
	description,
	ogTitle: title,
	ogDescription: description,
});
</script>

<template>
	<UButton variant="link" icon="i-heroicons-arrow-left-20-solid" @click.prevent="$router.back()"> Go Back </UButton>
	<UiPageSection
		v-if="foundBrawler && playerBrawler"
		class="divide-y-0 *:pt-2!"
		:title="foundBrawler.name"
		:description="`View ${player!.name}'s stats for ${foundBrawler!.name}`"
		orientation="vertical"
	>
		<div class="grid grid-cols-5 gap-4 pt-0!">
			<PlayersBrawlerPortraitCard
				v-if="fullStatus"
				:brawler="foundBrawler!"
				:playerBrawler="playerBrawler!"
				class="col-span-5 h-full w-full min-[340px]:w-[revert] sm:col-span-2 lg:col-span-1"
			/>
			<PlayersBrawlerStatsTable
				v-if="fullStatus"
				:playerBrawler="playerBrawler!"
				class="col-span-5 flex w-full flex-col sm:col-span-3 lg:col-span-2"
			/>
			<div v-if="fullStatus" class="col-span-5 grid grid-cols-2 gap-4 lg:col-span-2">
				<PlayersBrawlerOwnedPower
					class="col-span-1 h-full w-full"
					image="/icons/player/brawler-powers/gadget-big.png"
					title="Owned Gadgets"
					type="gadgets"
					:powers="playerBrawler!.gadgets"
				/>
				<PlayersBrawlerOwnedPower
					class="col-span-1 h-full w-full"
					image="/icons/player/brawler-powers/starpower-big.png"
					title="Owned Star Powers"
					type="starPowers"
					:powers="playerBrawler!.starPowers"
				/>
				<PlayersBrawlerOwnedPower
					class="col-span-2 h-full w-full"
					image="/icons/player/brawler-powers/gear-big.png"
					title="Owned Gears"
					type="gears"
					:powers="playerBrawler!.gears"
				/>
			</div>
		</div>
		<!--
 <div v-else class="pt-0! grid grid-cols-5 gap-4">
			<div class="col-span-5 sm:col-span-2 lg:col-span-1 h-full w-full min-[340px]:w-[revert]">
				<USkeleton height="263" width="180" />
			</div>
			<div class="col-span-5 sm:col-span-3 lg:col-span-2 flex flex-col w-full">
				<USkeleton height="263" width="180" />
			</div>
			<div class="col-span-5 lg:col-span-2 grid grid-cols-2 gap-4">
				<div class="w-full h-full col-span-1">
					<USkeleton height="263" width="180" />
				</div>
				<div class="w-full h-full col-span-1">
					<USkeleton height="263" width="180" />
				</div>
				<div class="w-full h-full col-span-2">
					<USkeleton height="263" width="180" />
				</div>
			</div>
		</div> 
-->
	</UiPageSection>
</template>

<style>
.brawlstars-text {
	text-shadow:
		0px 2.5px 0px #000,
		-1px -1px 0 #000,
		1px -1px 0 #000,
		-1px 1px 0 #000,
		1px 1px 0 #000;
}
</style>
