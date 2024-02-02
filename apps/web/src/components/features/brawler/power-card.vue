<script setup lang="ts">
import type { BrawlApiGadget, BrawlApiStarPower } from "@brawltracker/brawl-api";
import { Image } from "@unpic/vue";

const props = defineProps<{
	powers: BrawlApiGadget[] | BrawlApiStarPower[];
	type: "gadgets" | "starpowers";
}>();

const imageUrls = computed(() => {
	const path = props.type;
	return props.powers.map((power) => `https://cdn.deathblows.tech/file/bs-api/${path}/${power.id}.webp`);
});
</script>

<!-- eslint-disable vue/no-v-html -->
<template>
	<div class="mt-3 grid grid-cols-1 gap-3 bg-card lg:grid-cols-2 lg:gap-5">
		<div v-for="(power, index) in $props.powers" :key="power.name">
			<div class="flex flex-row gap-4 lg:flex-col">
				<div class="flex flex-row items-center gap-3 max-lg:max-h-[50px] max-lg:w-full max-lg:max-w-[50px]">
					<Image
						:src="imageUrls[index]!"
						class="self-center bg-contain object-cover lg:self-auto"
						width="50"
						height="50"
					/>
					<p class="hidden text-xl font-bold tracking-tight lg:block">{{ power.name }}</p>
				</div>
				<div class="flex flex-col">
					<p class="block text-xl font-bold tracking-tight lg:hidden">{{ power.name }}</p>
					<p class="text-sm text-muted-foreground" v-html="(power as unknown as any).descriptionHtml"></p>
				</div>
			</div>
		</div>
	</div>
</template>
