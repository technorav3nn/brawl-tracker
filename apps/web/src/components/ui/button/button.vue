<script setup lang="ts">
import { Primitive } from "radix-vue";
import type { PrimitiveProps } from "radix-vue/dist/Primitive/Primitive";
import { cn } from "$lib/util/tailwind";
import { buttonVariants } from "./index";

type Props = {
	variant?: NonNullable<Parameters<typeof buttonVariants>[0]>["variant"];
	size?: NonNullable<Parameters<typeof buttonVariants>[0]>["size"];
} & PrimitiveProps;

const props = withDefaults(defineProps<Props>(), {
	as: "button",
});
</script>

<template>
	<Primitive
		v-bind="props"
		:class="
			cn(
				buttonVariants({
					variant,
					size,
				}),
				$attrs.class ?? ''
			)
		"
	>
		<slot />
	</Primitive>
</template>
