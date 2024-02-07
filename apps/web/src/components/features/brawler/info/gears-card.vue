<script setup lang="ts">
import { CDN_URL, normalizeNameToCdnName } from "@brawltracker/cdn";
import { Image } from "@unpic/vue";
import { typedObjectEntries } from "$lib/util/common";

const props = defineProps<{
	brawlerId: number;
}>();

const $img = useImage();

function upperFirstLetters(str: string) {
	return str
		.split(" ")
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(" ");
}

const showSuperRareGears = ref(true);

const { data: gears } = await useFetch(`/api/gears`);
const filteredGears = computed(() => {
	return Object.fromEntries(
		typedObjectEntries(gears.value!)
			.filter(
				([, gear]) => gear.brawlersAvaliableTo === null || gear.brawlersAvaliableTo.includes(props.brawlerId)
			)
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
	<div class="col-span-2 rounded-lg border border-border p-4 shadow">
		<h2 class="text-2xl font-bold tracking-tight">Gears</h2>
		<div class="mt-3 flex items-center gap-2">
			<UiCheckbox id="show-super-rares" v-model:checked="showSuperRareGears" />
			<label
				for="show-super-rares"
				class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
			>
				Show Super Rare Gears
			</label>
		</div>
		<div class="mt-3 grid grid-cols-1 bg-card sm:grid-cols-2 lg:grid-cols-3">
			<div v-for="gear in filteredGears" :key="gear.name" class="flex flex-col gap-2 p-2">
				<div class="flex items-center gap-2">
					<Image
						:src="
							$img(`${CDN_URL}/gears/${normalizeNameToCdnName(gear.name)}/icon.webp`, {
								width: 50,
								height: 52,
							})
						"
						width="50"
						height="52"
						class="!object-scale-down"
					/>
					<p class="text-xl font-bold tracking-tight">
						{{ upperFirstLetters(gear.name.toLowerCase()) }}
					</p>
				</div>
				<p class="text-sm text-muted-foreground">{{ gear.description }}</p>
			</div>
		</div>
	</div>
</template>
