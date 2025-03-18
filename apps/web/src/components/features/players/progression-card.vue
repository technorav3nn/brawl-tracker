<script setup lang="ts">
defineProps<{
	title: string;
	image: string;
	value: number;
	max: number;
}>();

// eslint-disable-next-line @typescript-eslint/unbound-method
const { format } = new Intl.NumberFormat("en-US", { notation: "compact" });
</script>

<template>
	<UPageCard :title :ui="{ container: 'gap-y-2.5 sm:py-4 sm:px-6 py-4 px-6' }">
		<UProgress :modelValue="value" :max />

		<div class="flex items-center gap-2">
			<NuxtImg fit="inside" :src="image" width="26" height="26" />
			<p class="text-md font-semibold tracking-tight">
				{{ format(value) }} / <span class="text-neutral-500 dark:text-neutral-400">{{ format(max) }}</span>
			</p>
			<p class="text-sm text-neutral-500 dark:text-neutral-400">({{ ((value / max) * 100).toFixed(0) }}%)</p>
		</div>
	</UPageCard>
</template>
