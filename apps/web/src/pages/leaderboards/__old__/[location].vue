<script setup lang="ts">
import type { CountryCodes } from "@brawltracker/brawl-stars-api";
// import { byCountry } from "country-code-lookup";
import { capitalizeFirstLetter } from "$lib/utils/common";

const route = useRoute("leaderboards-location");
const longLocation = decodeURIComponent(route.params.location as CountryCodes);
const type = route.path.split("/").pop();
// const location = byCountry(longLocation)?.iso2;

const descriptions: Record<string, string> = {
	ranked: "The best players in Ranked from every season around the world!",
	clubs: "The top clubs in the game from around the world!",
	players: "The players with the highest trophies from around the world!",
	brawler: "The best players in the world for {brawler}!",
};
const description = computed(() => {
	const desc = descriptions[type!];
	if (type === "brawler") {
		return desc.replace("{brawler}", capitalizeFirstLetter(route.query.brawler as string));
	}

	return desc;
});
</script>

<template>
	<UContainer>
		<UPageHero :description :ui="{ wrapper: 'sm:!pt-16 sm:!pb-2 !pt-8 !pb-4' }">
			<NuxtImg
				src="/icons/ranked/ranked-icon.png"
				width="300"
				height="220"
				alt="Ranked Icon"
				class="place-self-end"
			/>
			<template #title>
				{{ capitalizeFirstLetter(type!) }} Leaderboard in
				<span class="text-primary-400 inline-block">{{ longLocation }}</span>
			</template>
		</UPageHero>
		<UPage>
			<UPageBody>
				<NuxtPage />
			</UPageBody>
		</UPage>
	</UContainer>
</template>
