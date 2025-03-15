<template>
	<div>
		<div class="p-2">
			<div class="grid grid-cols-3 gap-1">
				<PlayersProfileEditorColorPickerPill
					v-for="color in primaryColors"
					:key="color"
					:color="color"
					:selected="primary!"
					@select="primary = color"
				/>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import colors from "tailwindcss/colors";
import { useProfileConfigStore } from "./store";
import { PlayersProfileEditorColorPickerPill } from "#components";
import { omit } from "#ui/utils";

const neutralColors = ["slate", "gray", "zinc", "neutral", "stone"];
const colorsToOmit = ["inherit", "current", "transparent", "black", "white", ...neutralColors];
const primaryColors = Object.keys(omit(colors, colorsToOmit as any));

const appConfig = useAppConfig();
const { selectedTheme } = storeToRefs(useProfileConfigStore());

const primary = computed({
	get() {
		return appConfig.ui.colors.primary;
	},
	set(option) {
		selectedTheme.value = option!;
		appConfig.ui.colors.primary = option!;
	},
});
</script>
