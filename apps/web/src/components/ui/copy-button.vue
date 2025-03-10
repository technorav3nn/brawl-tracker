<script setup lang="ts">
import { UTooltip, type UButton } from "#components";

const props = defineProps<{
	text: string;
	tooltipContent: string;
}>();
defineOptions({ inheritAttrs: false });

const icon = ref("i-heroicons-clipboard-document");

// eslint-disable-next-line vue/no-setup-props-destructure
const content = ref(props.tooltipContent);

async function onClick() {
	if (navigator.clipboard) {
		await navigator.clipboard.writeText(props.text);
		content.value = "Copied!";
		icon.value = "i-heroicons-check-20-solid";
		setTimeout(() => {
			icon.value = "i-heroicons-clipboard-document";
			content.value = props.tooltipContent;
		}, 2000);
	}
}

const attrs = useAttrs();
</script>

<template>
	<UTooltip :text="content">
		<UButton :size="(props as any).size" v-bind="attrs" :icon="icon" @click="onClick" />
	</UTooltip>
</template>
