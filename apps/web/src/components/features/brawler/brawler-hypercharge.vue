<script setup lang="ts">
import type { BrawlApiBrawler } from "@brawltracker/brawl-api";
import { type CdnBrawler, CDN_URL_V2 } from "@brawltracker/cdn/v2";
import { Image } from "@unpic/vue";

const props = defineProps<{
	brawler: BrawlApiBrawler;
	brawlerCdnData: CdnBrawler;
}>();
const { brawlerCdnData } = toRefs(props);

const hypercharge = computed(() => brawlerCdnData.value.hypercharge);

// const stats = computed(() => {
// 	return hypercharge.value.stats
// 		?.filter((s) => s.label !== "Hypercharge Multiplier")
// 		.map((s) => {
// 			if (!s.value.startsWith("+")) {
// 				return {
// 					...s,
// 					value: `+${s.value}`,
// 				};
// 			}

// 			return s;
// 		});
// });
const hyperchargeIconUrl = computed(() => `${CDN_URL_V2}/hypercharges/${props.brawler.id}.webp`);
</script>

<template>
	<div v-if="hypercharge" class="flex flex-col rounded-lg border border-(--ui-border) shadow-sm">
		<div class="flex flex-col p-4 py-2.5">
			<div class="flex w-full items-center gap-2">
				<Image
					:src="hyperchargeIconUrl"
					width="40"
					height="40"
					alt="Attack icon"
					fit="inside"
					class="-ml-1 self-center bg-contain object-cover"
					format="webp"
				/>
				<div class="-ml-1 flex w-full items-center justify-between gap-1 text-2xl font-bold tracking-tight">
					HYPERCHARGE: {{ hypercharge.name }}
					<UPopover :open-delay="0" :close-delay="0" mode="hover" :ui="{ content: 'w-48 p-3' }">
						<UIcon name="i-lucide-info" />
						<template #content>
							<p class="text-sm">
								Note that Hypercharge stat boosts were changed to all be the same, 20% speed, 5% shield and 5% damage.
							</p>
						</template>
					</UPopover>
				</div>
			</div>
		</div>
		<div class="h-full">
			<div class="flex h-full w-full flex-col">
				<div class="flex flex-row">
					<div
						class="flex w-full flex-row gap-2.5 rounded-sm rounded-t-none rounded-b-none border border-r-0 border-l-0 border-(--ui-border) p-2.5"
					>
						<NuxtImg class="h-min" src="/icons/super-icon-2.png" width="65" height="55" />
						<div class="flex flex-col">
							<p class="text-md font-bold text-yellow-600/80 dark:text-yellow-400">SUPER</p>
							<p class="text-sm font-medium">{{ hypercharge.description }}</p>
						</div>
					</div>
				</div>
				<div class="my-2.5 flex h-full w-full flex-row flex-wrap *:flex-1">
					<div
						class="flex flex-col items-center justify-center gap-0.5 rounded-sm rounded-t-none rounded-br-none border border-t-0 border-b-0 border-l-0 border-(--ui-border) p-1.5"
					>
						<NuxtImg src="/icons/speed-icon.png" width="50" height="50" fit="inside" />
						<p class="text-lg font-bold text-green-600/80 dark:text-green-400">SPEED</p>
						<p class="text-xl font-bold">+20%</p>
					</div>
					<div
						class="flex flex-col items-center justify-center gap-0.5 rounded-sm rounded-t-none rounded-b-none border border-t-0 border-b-0 border-l-0 border-(--ui-border) p-1.5"
					>
						<NuxtImg src="/icons/damage-icon.png" width="50" height="50" fit="inside" />
						<p class="text-lg font-bold text-red-600/80 dark:text-red-400">DAMAGE</p>
						<p class="text-xl font-bold">+5%</p>
					</div>
					<div
						class="flex flex-col items-center justify-center gap-0.5 rounded-sm rounded-t-none rounded-bl-none border border-t-0 border-r-0 border-b-0 border-l-0 border-(--ui-border) p-1.5"
					>
						<NuxtImg src="/icons/shield-icon.png" width="50" height="50" fit="inside" />
						<p class="text-lg font-bold text-blue-600/80 dark:text-blue-400">SHIELD</p>
						<p class="text-xl font-bold">+5%</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
