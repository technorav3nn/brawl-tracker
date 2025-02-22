export default defineNuxtRouteMiddleware(() => {
	// disable the loading indicator only for this page
	useLoadingIndicatorState().value = false;
});
