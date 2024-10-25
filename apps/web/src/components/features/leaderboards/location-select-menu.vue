<script setup lang="ts">
import type { CountryCodes } from "@brawltracker/brawl-stars-api";
import { countries } from "country-code-lookup";
import { getCountryFlagEmoji } from "$lib/utils/common";

const route = useRoute("leaderboards-ranked");
const currentLocation = (route.query.location ?? "global") as CountryCodes;

const locations = [
	...countries
		.map((country) => {
			const newLocation = encodeURIComponent(country.iso2);
			return {
				// eslint-disable-next-line n/prefer-global/url-search-params
				url: `${route.path}?${new URLSearchParams({ ...route.query, location: newLocation })}`,
				emoji: getCountryFlagEmoji(country.iso2),
				countryCode: country.iso2,
				name: country.country,
			};
		})
		.sort((a, b) => a.name.localeCompare(b.name)),
];

const selected = ref(locations.find((l) => l.countryCode === currentLocation));
const firstTime = ref(false);
watch(
	selected,
	(v) => {
		if (!firstTime.value) {
			firstTime.value = true;
			return;
		}

		navigateTo(v!.url);
	},
	{ immediate: true }
);
</script>

<template>
	<USelectMenu
		v-model="selected"
		:options="locations"
		optionAttribute="name"
		searchable
		searchable-placeholder="Search a country..."
		class="w-48"
	>
		<template #label>
			<span>{{ selected?.emoji }} {{ selected?.name }}</span>
		</template>
		<template #option="{ option }">
			<p>{{ option.emoji }} {{ option.name }}</p>
		</template>
	</USelectMenu>
</template>
