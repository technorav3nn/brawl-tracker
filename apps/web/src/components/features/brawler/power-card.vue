<script setup lang="ts">
import type { BrawlApiGadget, BrawlApiStarPower } from "@brawltracker/brawl-api";

defineProps<{
	powers: BrawlApiGadget[] | BrawlApiStarPower[];
}>();
</script>

<!-- eslint-disable vue/no-v-html -->
<template>
	<div class="mt-3 grid grid-cols-1 bg-card lg:grid-cols-2">
		<div v-for="power in $props.powers" :key="power.name" class="bg-card p-4 shadow">
			<div class="flex flex-row gap-4 lg:flex-col">
				<div class="flex max-h-[60px] w-full max-w-[60px] flex-row items-center gap-3">
					<NuxtImg
						:src="power.imageUrl"
						class="aspect-square max-h-[60px] w-full max-w-[60px] self-center bg-contain object-cover lg:self-auto"
						width="60"
						height="60"
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
