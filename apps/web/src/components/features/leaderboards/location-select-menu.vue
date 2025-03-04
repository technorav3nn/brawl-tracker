<script setup lang="ts">
import type { CountryCodes } from "@brawltracker/brawl-stars-api";
import { countries } from "country-code-lookup";

const route = useRoute();
const currentLocation = (route.query.location ?? "global") as CountryCodes;

interface Location {
	url: string;
	emoji?: string;
	icon?: string;
	countryCode: string;
	name: string;
}

const locations: Location[] = [
	{ url: `${route.path}?location=global`, emoji: "🌎", countryCode: "global", name: "Global" },
	...countries
		.map((country) => {
			const newLocation = encodeURIComponent(country.iso2);
			return {
				// eslint-disable-next-line n/prefer-global/url-search-params
				url: `${route.path}?${new URLSearchParams({ ...route.query, location: newLocation })}`,
				icon: `i-circle-flags-${country.iso2.toLowerCase()}`,
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
			<Icon v-if="selected?.icon" :name="selected.icon" />
			<span v-else-if="selected?.emoji">{{ selected.emoji }}</span>
			<span>{{ selected?.name }}</span>
		</template>
		<template #option="{ option }">
			<Icon v-if="option?.icon" :name="option.icon" />
			<span v-else-if="option?.emoji">{{ option.emoji }}</span>
			<span>{{ option.name }}</span>
		</template>
	</USelectMenu>
</template>
