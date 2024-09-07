<script setup lang="ts">
import { TabsRoot, useForwardPropsEmits, type TabsRootEmits, type TabsRootProps } from "radix-vue";

const props = defineProps<TabsRootProps>();
const emits = defineEmits<TabsRootEmits>();

const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
	<div>
		<TabsRoot v-bind="forwarded" class="relative mr-auto w-full">
			<slot />
		</TabsRoot>
	</div>
</template>
