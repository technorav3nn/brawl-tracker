<script setup lang="ts">
/* eslint-disable @typescript-eslint/sort-type-constituents */
import type { Gadget, Gear, StarPower } from "@brawltracker/brawl-stars-api";
import { CDN_URL_V2, getAllGears } from "@brawltracker/cdn/v2";
import { Image } from "@unpic/vue";

const props = defineProps<{
	title: string;
	image: string;
	powers: (Gadget | StarPower | Gear)[];
	type: "gadgets" | "starPowers" | "gears";
}>();

const route = useRoute("players-tag-brawlers-id");

function getUrlForGear(name: string) {
	// conver the name to lowercase snake case
	// Talk To The Hand => talk_to_the_hand
	const newName = name.toLowerCase().replaceAll(/\s/g, "_");
	return `${CDN_URL_V2}/gears/${newName}/icon.webp`;
}

// eslint-disable-next-line @typescript-eslint/promise-function-async
const { data: gears } = await useAsyncData("gears", () => getAllGears());
const { data: brawler } = await useFetch("/api/brawlers", {
	key: "brawlers",
	transform: (d) => d.list.find((brawler) => brawler.id.toString() === route.params.id),
});

const gearsForBrawler = computed(() => {
	if (!brawler.value ?? !gears.value) return [];
	return Object.values(gears.value).filter(
		(g) => g.brawlersAvaliableTo === null || g.brawlersAvaliableTo.includes(brawler.value!.id)
	);
});

const powersWithEmpties = computed(() => {
	if (!brawler.value) return [];
	if (!gears.value) return [];

	const powers = props.powers;
	if (props.type !== "gears") {
		return brawler.value[props.type as "gadgets" | "starPowers"].map((p) => {
			if (powers.some((power) => power.id === p.id)) {
				return {
					name: p.name,
					image: `${CDN_URL_V2}/${props.type === "starPowers" ? "star-powers" : "gadgets"}/${p.id}.webp`,
					owned: true,
				};
			} else {
				return {
					name: p.name,
					image:
						props.type === "starPowers"
							? "/icons/player/brawler-powers/starpower-empty.webp"
							: "/icons/player/brawler-powers/gadget-empty.webp",
					owned: false,
				};
			}
		});
	}

	return gearsForBrawler.value.map((g) => {
		if (powers.some((power) => power.name === g.name)) {
			return {
				name: g.name,
				image: getUrlForGear(g.name),
				owned: true,
			};
		} else {
			return { name: g.name, image: "/icons/player/brawler-powers/gear-empty.png", owned: false };
		}
	});
});
</script>

<template>
	<UCard :ui="{ header: 'px-2.5! py-2.5', body: 'h-full px-4! py-1.5!' }">
		<template #header>
			<div class="flex items-center gap-2">
				<Image :src="image" width="30" height="30" loading="eager" />
				<h3 class="truncate text-lg leading-6 font-semibold text-gray-900 dark:text-white">{{ title }}</h3>
			</div>
		</template>

		<div class="py-2">
			<div
				:class="[type === 'starPowers' || type === 'gadgets' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-1' : 'grid-cols-4']"
				class="grid gap-8 sm:gap-2"
			>
				<div
					v-for="power in powersWithEmpties"
					:key="power.name"
					:class="[type === 'starPowers' || type === 'gadgets' ? 'flex-col xl:flex-row xl:gap-2' : 'flex-col']"
					class="flex items-center gap-1"
				>
					<Image :src="power.image" width="50" height="50" loading="eager" />
					<p class="text-center text-sm font-bold uppercase">{{ power.name }}</p>
				</div>
			</div>
		</div>
	</UCard>
</template>

<style scoped></style>
