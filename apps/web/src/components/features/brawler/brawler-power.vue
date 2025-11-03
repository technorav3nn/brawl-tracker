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
	<div class="flex flex-col rounded-lg border border-(--ui-border) shadow-sm">
		<div class="flex flex-col p-4 py-2.5">
			<div class="flex items-center gap-3">
				<Image
					:src="`/icons/powers/${props.type}-empty.png`"
					width="38"
					height="38"
					:alt="`${props.type === 'gadgets' ? 'Gadget' : 'Star Power'} icon`"
					class="-ml-1 self-center bg-contain object-cover"
				/>
				<h1 class="-ml-1 text-2xl font-bold tracking-tight">
					{{ props.type === "gadgets" ? "Gadgets" : "Star Powers" }}
				</h1>
			</div>
		</div>
		<div class="h-full">
			<div
				class="flex h-full w-full flex-row gap-2.5 rounded-sm rounded-t-none rounded-b-none border border-r-0 border-b-0 border-l-0 border-(--ui-border) px-4 py-0"
			>
				<div class="bg-card mt-3 mb-3 flex w-full flex-col gap-4">
					<div v-for="power in powers" :key="power.id" class="w-full">
						<div class="flex w-full flex-col gap-2 lg:flex-col">
							<div class="flex w-full flex-row items-center gap-3">
								<Image
									:src="`${CDN_URL_V2}/${props.type === 'gadgets' ? 'gadgets' : 'star-powers'}/${power.id}.webp`"
									class="self-center bg-contain object-cover lg:self-auto"
									width="40"
									height="40"
									:alt="`${power.name} icon`"
								/>
								<div class="flex w-full flex-col whitespace-nowrap">
									<p class="w-full text-lg font-bold tracking-tight">{{ power.name }}</p>
									<div class="flex items-center gap-1">
										<template v-if="power.cooldown">
											<UIcon name="i-heroicons-clock" class="h-4 w-4 text-success" />
											<p class="text-sm font-medium text-success">{{ power.cooldown }}</p>
										</template>
									</div>
								</div>
							</div>
							<div class="flex flex-col">
								<p class="text-muted-foreground text-sm">{{ power.description }}</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
