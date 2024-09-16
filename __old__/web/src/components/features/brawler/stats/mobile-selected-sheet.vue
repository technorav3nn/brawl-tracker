<script setup lang="ts">
import { useBrawlerMapStore } from "$components/features/brawler/stats/store";

const props = defineProps<{
	open: boolean;
}>();

const emits = defineEmits<{
	// eslint-disable-next-line no-unused-vars
	(e: "update:open", payload: string | number): void;
}>();

// eslint-disable-next-line vue/no-setup-props-destructure
const modelValue = useVModel(props, "open", emits, {
	passive: true,
	defaultValue: false,
});

const { selectedMap, brawler } = storeToRefs(useBrawlerMapStore());
</script>

<template>
	<div>
		<UiSheet v-model:open="modelValue">
			<UiSheetContent class="focus:outline-none" side="bottom">
				<div class="flex justify-center">
					<BrawlerStatsSelectedMap
						:key="selectedMap!.id"
						:imageSize="350"
						:selectedMap="selectedMap!"
						insideSheet
						:brawler="brawler!"
					/>
				</div>
			</UiSheetContent>
		</UiSheet>
	</div>
</template>
