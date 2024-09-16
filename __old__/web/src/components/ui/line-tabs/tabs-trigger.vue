<script setup lang="ts">
import { TabsTrigger, type TabsTriggerProps } from "radix-vue";
import { cn } from "$lib/util/tailwind";

const props = defineProps<TabsTriggerProps & { class?: string }>();
</script>

<template>
	<TabsTrigger
		v-bind="props"
		:class="
			cn(
				'relative inline-flex h-9 items-center justify-center whitespace-nowrap rounded-none border-b-2 border-b-transparent bg-transparent px-4 py-1 pb-3 pt-2 text-sm font-semibold text-muted-foreground shadow-none ring-offset-background transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:border-b-primary data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-none',
				props.class
			)
		"
	>
		<slot />
	</TabsTrigger>
</template>
