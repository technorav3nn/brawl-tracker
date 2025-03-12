<script setup lang="ts">
import type { BrawlApiBrawler } from "@brawltracker/brawl-api";
import { type BrawlerData, CDN_URL } from "@brawltracker/cdn";

const props = defineProps<{
	brawler: BrawlApiBrawler;
	brawlerCdnData: BrawlerData;
}>();
const gadgets = computed(() => props.brawlerCdnData.gadgets);
</script>

<template>
	<div class="flex flex-col rounded-lg border border-border shadow-sm">
		<div class="flex flex-col p-4 py-2.5">
			<div class="flex items-center gap-3">
				<NuxtImg
					:src="`${CDN_URL}/${gadgets[0].path}`"
					width="38"
					height="38"
					alt="Attack icon"
					fit="inside"
					class="self-center bg-contain object-cover -ml-1"
					format="webp"
				/>
				<h1 class="text-2xl font-bold tracking-tight -ml-1">Gadgets</h1>
			</div>
		</div>
		<div class="h-full">
			<div class="flex flex-col w-full h-full">
				<div class="flex flex-row">
					<div
						class="px-4 py-1.5 border border-border border-l-0 border-r-0 border-b-0 w-full rounded-sm rounded-b-none rounded-t-none flex flex-row gap-2.5"
					>
						<div class="mt-3 grid grid-cols-1 gap-3 bg-card lg:grid-cols-2 lg:gap-5">
							<div v-for="gadget in gadgets" :key="gadget.id">
								<div class="flex flex-row gap-4 lg:flex-col">
									<div class="flex flex-row items-center gap-3 max-lg:max-h-[50px] max-lg:w-full max-lg:max-w-[50px]">
										<NuxtImg
											:src="`${CDN_URL}/${gadget.path}`"
											class="self-center bg-contain object-cover lg:self-auto"
											width="40"
											height="40"
										/>
										<p class="hidden text-lg font-bold tracking-tight lg:block">{{ gadget.name }}</p>
									</div>
									<div class="flex flex-col">
										<p class="block font-bold tracking-tight lg:hidden">{{ gadget.name }}</p>
										<p class="text-sm italics text-muted-foreground">{{ gadget.description }}</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
