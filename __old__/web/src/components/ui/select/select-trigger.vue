<script setup lang="ts">
import { CaretSortIcon } from "@radix-icons/vue";
import { SelectIcon, SelectTrigger, type SelectTriggerProps } from "radix-vue";
import { cn } from "$lib/util/tailwind";

const props = withDefaults(defineProps<SelectTriggerProps & { class?: string; invalid?: boolean }>(), {
	class: "",
	// eslint-disable-next-line vue/no-boolean-default
	invalid: false,
});
</script>

<template>
	<SelectTrigger
		v-bind="props"
		:class="[
			cn(
				'flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1',
				props.class
			),
			props.invalid ? 'ring-2 !ring-destructive placeholder:!text-destructive' : '',
		]"
	>
		<slot />
		<SelectIcon as-child>
			<CaretSortIcon class="h-4 w-4 opacity-50" />
		</SelectIcon>
	</SelectTrigger>
</template>
