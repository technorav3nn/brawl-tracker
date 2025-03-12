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
			:class="[background.name === selectedBackground?.name ? 'filter brightness-[0.70]' : '']"
			:ui="{ body: { padding: 'p-0!' } }"
			role="button"
		>
			<NuxtImg
				:src="`/backgrounds/${background.name}${
					background.hasColorModeVariants ? `-${$colorMode.value}` : ''
				}.${background.fileFormat}`"
				:alt="background.name"
				width="400"
				height="180"
				class="rounded-sm cursor-pointer hover:ring-2 hover:ring-primary-500 dark:hover:ring-primary-400 hover:bg-gray-100/50 dark:hover:bg-gray-800/50"
			/>
		</UCard>
		<div
			v-if="background.name === selectedBackground?.name"
			style="position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%)"
		>
			<UIcon name="i-heroicons-photo" class="text-white size-10" />
		</div>
	</button>
</template>
