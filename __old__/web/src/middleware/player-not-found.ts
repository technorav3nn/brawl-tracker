export default defineNuxtRouteMiddleware(async (to, from) => {
	const playerTag = decodeURIComponent(to.path.split("/")[2]! || from.path.split("/")[2]!).replace("#", "");
	try {
		let _ = await $fetch(`/api/players/${playerTag}`);
		(_ as any) = undefined;
	} catch {
		return navigateTo("/players?notfound");
	}
});
