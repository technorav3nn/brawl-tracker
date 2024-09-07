<script setup lang="ts">
import type { BrawlApiBrawler } from "@brawltracker/brawl-api";
import { CDN_URL, type BrawlerData } from "@brawltracker/cdn";
import { Image } from "@unpic/vue";
// import { useKitAbilityStats } from "./brawler-composables";

const props = defineProps<{
	brawler: BrawlApiBrawler;
	brawlerCdnData: BrawlerData;
}>();
const { brawlerCdnData } = toRefs(props);
// const { basicStats } = useKitAbilityStats("hypercharge");

const hypercharge = computed(() => brawlerCdnData.value.hypercharge);
const hyperchargeIconUrl = computed(() => `${CDN_URL}${hypercharge.value!.path}`);
</script>

<template>
	<div v-if="hypercharge" class="flex flex-col rounded-lg border border-border shadow">
		<div class="flex flex-col p-4">
			<div class="flex items-center gap-2">
				<NuxtImg
					:src="hyperchargeIconUrl"
					width="30"
					height="30"
					alt="Attack icon"
					fit="inside"
					class="self-center bg-contain object-cover"
					format="webp"
				/>
				<h1 class="text-2xl font-bold tracking-tight">HYPERCHARGE: {{ hypercharge.name }}</h1>
			</div>
		</div>
		<div class="h-full">
			<div class="flex flex-col w-full h-full">
				<div class="flex flex-row">
					<div
						class="p-2.5 border border-border border-l-0 border-r-0 w-full rounded rounded-b-none rounded-t-none flex flex-row gap-2.5"
					>
						<Image src="/icons/super-icon-2.png" width="65" height="55" />
						<div class="flex flex-col">
							<p class="text-md font-bold dark:text-yellow-400 text-yellow-600/80">SUPER</p>
							<p class="text-sm font-medium">{{ hypercharge.description }}</p>
						</div>
					</div>
				</div>
				<div class="flex flex-row *:flex-[1] flex-wrap w-full h-full">
					<div
						class="p-1.5 rounded border border-border border-t-0 border-b-0 rounded-br-none border-l-0 rounded-t-none flex flex-col items-center justify-center gap-0.5"
					>
						<NuxtImg src="/icons/speed-icon.png" width="50" height="50" fit="inside" />
						<p class="text-lg font-bold dark:text-green-400 text-green-600/80">SPEED</p>
						<p class="text-xl font-bold">{{ hypercharge.stats.hyperchargespeed }}</p>
					</div>
					<div
						class="p-1.5 rounded border border-border border-l-0 border-t-0 border-b-0 rounded-b-none rounded-t-none flex flex-col items-center justify-center gap-0.5"
					>
						<NuxtImg src="/icons/damage-icon.png" width="50" height="50" fit="inside" />
						<p class="text-lg font-bold dark:text-red-400 text-red-600/80">DAMAGE</p>
						<p class="text-xl font-bold">{{ hypercharge.stats.hyperchargedamage }}</p>
					</div>
					<div
						class="p-1.5 rounded border border-border border-l-0 border-t-0 border-b-0 border-r-0 rounded-bl-none rounded-t-none flex flex-col items-center justify-center gap-0.5"
					>
						<NuxtImg src="/icons/shield-icon.png" width="50" height="50" fit="inside" />
						<p class="text-lg font-bold dark:text-blue-400 text-blue-600/80">SHIELD</p>
						<p class="text-xl font-bold">{{ hypercharge.stats.hyperchargeshield }}</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
