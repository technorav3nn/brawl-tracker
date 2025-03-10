import { defineStore } from "pinia";
import { type Background } from "$lib/backgrounds";

export const useProfileConfigStore = defineStore("profile-editor-store", () => {
	const background = ref<Background | null>(null);
	const theme = ref<string | null>(null);

	const selectedBackground = ref<Background | null>(null);
	const selectedTheme = ref<string | null>(null);

	async function applyChanges() {
		try {
			await $fetch("/api/profiles/update-config", {
				method: "PATCH",
				body: JSON.stringify({
					background: selectedBackground.value?.name,
					theme: selectedTheme.value,
				}),
			});
		} catch (error) {
			throw createError({ status: 500, message: `Failed to update profile: ${error}` });
		}
	}

	return {
		theme,
		selectedTheme,
		selectedBackground,
		background,
		applyChanges,
	};
});
