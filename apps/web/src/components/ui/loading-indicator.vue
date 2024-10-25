<script setup lang="ts">
import { twMerge } from "tailwind-merge";

const attrs = useAttrs() as any;
</script>

<template>
	<UIcon
		:class="twMerge('pointer-events-none text-gray-400 dark:text-gray-500 h-5 w-5 animate-spin stroke-2', attrs.class)"
		name="i-tabler-loader-2"
	/>
</template>
