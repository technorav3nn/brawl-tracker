<script setup lang="ts">
import { cn } from "$lib/util/tailwind";
import { buttonVariants } from "./index";

interface Props {
	variant?: NonNullable<Parameters<typeof buttonVariants>[0]>["variant"];
	size?: NonNullable<Parameters<typeof buttonVariants>[0]>["size"];
	as?: string;
}

withDefaults(defineProps<Props>(), {
	as: "button",
});

defineEmits(["click"]);
</script>

<template>
	<component
		:is="as"
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
	</component>
</template>
