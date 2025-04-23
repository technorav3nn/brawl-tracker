export default defineNuxtRouteMiddleware(async () => {
	const { data: session } = await authClient.useSession(useFetch);
	if (session.value) return await navigateTo("/");
});
