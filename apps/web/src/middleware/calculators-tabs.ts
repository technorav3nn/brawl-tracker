export default defineNuxtRouteMiddleware((to) => {
	const tab = to.path.split("/")[2]!;
	if (!tab) {
		return navigateTo("/calculators/brawler-price");
	}
});
