<script setup lang="ts">
import { GemIcon, SwordsIcon } from "lucide-vue-next";
import { upperFirstCharacter } from "$lib/util/common";

type Tabs = "info" | "stats" | "cosmetics" | (string & {});
const TABS = ["info", "stats", "cosmetics"] as const;

const {
	params: { hash },
	path,
} = useRoute("brawlers-hash");
const { data: brawler } = await useFetch(`/api/brawlers/hash/${hash}`);

const tab = ref<Tabs>(path.split("/")[3]!);
</script>

<template>
	<div v-if="brawler">
		<UiButton
			asChild
			variant="link"
			class="mb-2 px-0 text-base font-normal text-foreground hover:font-medium"
		>
			<NuxtLink href="/brawlers">← Go Back</NuxtLink>
		</UiButton>

		<div class="flex flex-row gap-3">
			<div>
				<NuxtImg
					:src="brawler.imageUrl2"
					height="100"
					width="100"
					:alt="brawler.name"
					format="webp"
					class="rounded border border-border"
				/>
			</div>
			<div class="flex flex-col items-start justify-between">
				<h1 class="text-4xl font-bold">{{ brawler.name }}</h1>
				<div class="flex flex-col">
					<p class="flex items-center gap-1 text-muted-foreground">
						<GemIcon class="h-5 w-5 stroke-[1.5]" />
						{{ brawler.rarity.name }}
					</p>
					<p class="flex items-center gap-1 text-muted-foreground">
						<SwordsIcon class="h-5 w-5 stroke-[1.5]" />
						{{ brawler.class.name }}
					</p>
				</div>
			</div>
		</div>
		<p class="mt-3 max-w-4xl text-sm text-muted-foreground lg:text-base">{{ brawler.description }}</p>
		<UiTabs v-model:modelValue="tab" class="mt-4">
			<UiTabsList>
				<UiTabsTrigger v-for="tabRoute in TABS" :key="tabRoute" :value="tabRoute" asChild>
					<NuxtLink :to="`/brawlers/${brawler.hash}/${tabRoute}`">
						{{ upperFirstCharacter(tabRoute) }}
					</NuxtLink>
				</UiTabsTrigger>
			</UiTabsList>
		</UiTabs>
		<NuxtPage :brawler="brawler" class="mt-5" />
	</div>
</template>
