<script setup lang="ts">
import { useProfileConfigStore } from "./store";
import type { Background } from "$lib/backgrounds";

const props = defineProps<{
	background: Background;
}>();

const { selectedBackground } = storeToRefs(useProfileConfigStore());
function setBackground() {
	selectedBackground.value = props.background;
}
</script>

<template>
	<button
		type="button"
		class="relative focus:outline-2 focus:outline-primary-500 dark:focus:outline-primary-400"
		@click="setBackground"
	>
		<UCard
			class="relative"
			:class="[background.name === selectedBackground?.name ? 'brightness-[0.70] filter' : '']"
			:ui="{ body: 'p-0!' }"
			role="button"
		>
			<NuxtImg
				:src="`/backgrounds/${background.name}${
					background.hasColorModeVariants ? `-${$colorMode.value}` : ''
				}.${background.fileFormat}`"
				:alt="background.name"
				width="400"
				height="180"
				class="cursor-pointer rounded-sm hover:bg-neutral-100/50 hover:ring-2 hover:ring-primary-500 dark:hover:bg-neutral-800/50 dark:hover:ring-primary-400"
			/>
		</UCard>
		<div
			v-if="background.name === selectedBackground?.name"
			style="position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%)"
		>
			<UIcon name="i-heroicons-photo" class="size-10 text-white" />
		</div>
	</button>
</template>
