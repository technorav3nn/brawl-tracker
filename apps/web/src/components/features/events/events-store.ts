export const useEventsStore = defineStore("events", () => {
	const currentMenuOpen = ref<number | null>(null);

	return {
		setCurrentMenuOpen: (menuId: number | null) => (currentMenuOpen.value = menuId),
		currentMenuOpen,
	};
});

if (import.meta.hot) {
	import.meta.hot.accept(acceptHMRUpdate(useEventsStore, import.meta.hot));
}
