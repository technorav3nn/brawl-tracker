<script setup lang="ts">
import { DotFilledIcon } from "@radix-icons/vue";
import {
	DropdownMenuItemIndicator,
	DropdownMenuRadioItem,
	type DropdownMenuRadioItemEmits,
	type DropdownMenuRadioItemProps,
	useEmitAsProps,
} from "radix-vue";
import { cn } from "$lib/util/tailwind";

const props = defineProps<DropdownMenuRadioItemProps & { class?: string }>();
const emits = defineEmits<DropdownMenuRadioItemEmits>();
</script>

<template>
	<DropdownMenuRadioItem
		v-bind="{
			...props,
			...useEmitAsProps(emits),
		}"
		:class="
			cn(
				'data-[highlighted]:bg-outline-hover relative flex cursor-default select-none items-center rounded-md py-1.5 pl-7 text-sm outline-none transition-colors data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
				props.class
			)
		"
	>
		<span class="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
			<DropdownMenuItemIndicator>
				<DotFilledIcon class="h-4 w-4 fill-current" />
			</DropdownMenuItemIndicator>
		</span>
		<slot />
	</DropdownMenuRadioItem>
</template>
