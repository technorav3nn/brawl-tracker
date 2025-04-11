import { formatTag } from "@brawltracker/supercell-api-utils";
import { defineStore } from "pinia";
import { type Background } from "$lib/backgrounds";

export const useProfileConfigStore = defineStore("profile-editor-store", () => {
	const background = ref<Background | undefined>(undefined);
	const theme = ref<string | undefined>(undefined);

	const selectedBackground = ref<Background | undefined>(undefined);
	const selectedTheme = ref<string | undefined>(undefined);

	async function applyChanges() {
		try {
			const data = await $fetch("/api/profiles/update-config", {
				method: "PATCH",
				body: JSON.stringify({
					background: selectedBackground.value?.name,
					theme: selectedTheme.value,
				}),
			});
			const route = useRoute(`players-tag`);
			const asyncData = useNuxtData(`profiles-config-${formatTag(decodeURIComponent(route.params.tag))}`);
			asyncData.data.value = data;
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

if (import.meta.hot) {
	import.meta.hot.accept(acceptHMRUpdate(useProfileConfigStore, import.meta.hot));
}
