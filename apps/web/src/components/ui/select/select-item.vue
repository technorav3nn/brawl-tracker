<script setup lang="ts">
import { CheckIcon } from "@radix-icons/vue";
import { SelectItem, SelectItemIndicator, type SelectItemProps, SelectItemText } from "radix-vue";
import { cn } from "$lib/util/tailwind";

const props = defineProps<SelectItemProps & { class?: string }>();
</script>

<template>
	<SelectItem
		v-bind="props"
		:class="
			cn(
				'relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
				props.class
			)
		"
	>
		<span class="absolute right-2 flex h-3.5 w-3.5 items-center justify-center">
			<SelectItemIndicator>
				<CheckIcon class="h-4 w-4" />
			</SelectItemIndicator>
		</span>

		<SelectItemText>
			<slot />
		</SelectItemText>
	</SelectItem>
</template>
