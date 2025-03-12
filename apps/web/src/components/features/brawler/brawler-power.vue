<script setup lang="ts">
import type { BrawlApiBrawler } from "@brawltracker/brawl-api";
import { CDN_URL_V2, type CdnBrawler } from "@brawltracker/cdn/v2";
import { Image } from "@unpic/vue";

const props = defineProps<{
	brawler: BrawlApiBrawler;
	brawlerCdnData: CdnBrawler;
	type: "gadgets" | "starpowers";
}>();
const powers = computed(() =>
	props.brawlerCdnData[props.type].filter((power) => !power.name.includes("Mutation")).filter((p) => !p.name.includes("Mythic"))
);
</script>

<template>
	<div class="flex flex-col rounded-lg border border-border shadow-sm">
		<div class="flex flex-col p-4 py-2.5">
			<div class="flex items-center gap-3">
				<Image
					:src="`/icons/powers/${props.type}-empty.png`"
					width="38"
					height="38"
					alt="Attack icon"
					class="self-center bg-contain object-cover -ml-1"
				/>
				<h1 class="text-2xl font-bold tracking-tight -ml-1">
					{{ props.type === "gadgets" ? "Gadgets" : "Star Powers" }}
				</h1>
			</div>
		</div>
		<div class="h-full">
			<div
				class="px-4 py-1.5 border border-border border-l-0 border-r-0 border-b-0 w-full h-full rounded-sm rounded-b-none rounded-t-none flex flex-row gap-2.5"
			>
				<div class="mt-3 mb-3 flex flex-col gap-4 bg-card">
					<div v-for="power in powers" :key="power.id">
						<div class="flex flex-col gap-4 lg:flex-col">
							<div class="w-full flex flex-row items-center gap-3">
								<Image
									:src="`${CDN_URL_V2}/${props.type === 'gadgets' ? 'gadgets' : 'star-powers'}/${power.id}.webp`"
									class="self-center bg-contain object-cover lg:self-auto"
									width="40"
									height="40"
								/>
								<p class="text-lg font-bold tracking-tight w-full">{{ power.name }}</p>
							</div>
							<div class="flex flex-col">
								<p class="text-sm italics text-muted-foreground">{{ power.description }}</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
