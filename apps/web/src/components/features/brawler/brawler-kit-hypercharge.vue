<script setup lang="ts">
import type { BrawlApiBrawler } from "@brawltracker/brawl-api";
import { normalizeNameToCdnName, CDN_URL } from "@brawltracker/cdn";

const props = defineProps<{
	brawler: BrawlApiBrawler;
}>();

const { brawler } = toRefs(props);

const cdnName = computed(() => normalizeNameToCdnName(brawler.value.name));
const { data } = await useFetch(`/api/brawlers/name/${cdnName.value}/data`);
const image = computed(() => `${CDN_URL}${data.value!.hypercharge!.path.replaceAll("png", "webp")}`);
</script>

<template>
	<div class="rounded-lg border border-border p-4 shadow">
		<div class="flex flex-col">
			<div class="flex items-center gap-2">
				<NuxtImg
					v-if="image"
					:src="image"
					width="30"
					height="30"
					alt="Attack icon"
					fit="inside"
					class="self-center bg-contain object-cover"
				/>
				<h1 class="text-2xl font-bold tracking-tight">HYPERCHARGE: {{ data!.hypercharge!.name }}</h1>
			</div>
		</div>
		<div>
			<div class="mt-1">
				<p class="text-sm text-muted-foreground">
					{{ data!.hypercharge!.description }}
				</p>
			</div>
			<div class="mt-2">
				<UiTable>
					<UiTableHeader>
						<UiTableRow>
							<UiTableHead class="text-foreground">Speed</UiTableHead>
							<UiTableHead class="text-foreground">Damage</UiTableHead>
							<UiTableHead class="text-foreground">Shield</UiTableHead>
						</UiTableRow>
					</UiTableHeader>
					<UiTableBody>
						<UiTableRow>
							<UiTableCell class="text-foreground">
								{{ data!.hypercharge!.stats.hyperchargespeed }}
							</UiTableCell>
							<UiTableCell class="text-foreground">
								{{ data!.hypercharge!.stats.hyperchargedamage }}
							</UiTableCell>
							<UiTableCell class="text-foreground">
								{{ data!.hypercharge!.stats.hyperchargeshield }}
							</UiTableCell>
						</UiTableRow>
					</UiTableBody>
				</UiTable>
			</div>
		</div>
	</div>
</template>
