import { defineStore } from "pinia";
import { type Background } from "$lib/backgrounds";

export const useProfileConfigStore = defineStore("profile-editor-store", () => {
	const background = ref<Background | undefined>(undefined);
	const theme = ref<string | undefined>(undefined);

	const selectedBackground = ref<Background | undefined>(undefined);
	const selectedTheme = ref<string | undefined>(undefined);

	const queryClient = useQueryClient();

	async function applyChanges() {
		try {
			const data = await $fetch("/api/profiles/update-config", {
				method: "PATCH",
				body: JSON.stringify({
					background: selectedBackground.value?.name,
					theme: selectedTheme.value,
				}),
			});
			console.log("Profile config updated:", data);
			const route = useRoute(`players-tag`);
			await queryClient.setQueryData(profileConfigKeys.detail(route.params.tag), data);
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
