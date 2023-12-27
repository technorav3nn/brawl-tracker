<script setup lang="ts">
import { GemIcon , SwordsIcon } from "lucide-vue-next";

const {
	params: { hash },
} = useRoute("brawlers-hash");
const { data: brawler } = await useFetch(`/api/brawlers/hash/${hash}`);
</script>

<template>
	<div v-if="brawler">
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
	</div>
</template>
