<script setup lang="ts">
import { TabsList, type TabsListProps } from "radix-vue";
import { cn } from "$lib/util/tailwind";

const props = defineProps<TabsListProps & { class?: string }>();
</script>

<template>
	<TabsList
		v-bind="props"
		:class="cn('w-full justify-start rounded-none border-b bg-transparent p-0', props.class)"
	>
		<slot />
	</TabsList>
</template>
