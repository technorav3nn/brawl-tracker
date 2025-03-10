<template>
	<div>
		<div class="p-2">
			<div class="grid grid-cols-3 gap-px">
				<PlayersProfileEditorColorPickerPill
					v-for="color in primaryColors"
					:key="color.value"
					:color="color"
					:selected="primary!"
					@select="primary = color"
				/>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { useProfileConfigStore } from "./store";
import { PlayersProfileEditorColorPickerPill } from "#components";
import colors from "#tailwind-config/theme/colors";

const appConfig = useAppConfig();
const colorMode = useColorMode();
const { selectedTheme } = storeToRefs(useProfileConfigStore());

const primaryColors = computed(() =>
	appConfig.ui.colors
		.filter((color) => color !== "primary")
		.map((color) => ({
			value: color,
			text: color,
			hex: colors[color as keyof typeof colors][colorMode.value === "dark" ? 400 : 500],
		}))
);
const primary = computed({
	get() {
		return primaryColors.value.find((option) => option.value === appConfig.ui.primary);
	},
	set(option) {
		selectedTheme.value = option!.value;
		appConfig.ui.primary = option!.value;
	},
});
</script>
