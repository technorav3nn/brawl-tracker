<script setup lang="ts">
import { twMerge } from "tailwind-merge";

const attrs = useAttrs() as any;
</script>

<template>
	<UIcon
		:class="twMerge('pointer-events-none h-5 w-5 animate-spin stroke-2 text-neutral-400 dark:text-neutral-500', attrs.class)"
		name="i-heroicons-arrow-path-20-solid"
	/>
</template>
