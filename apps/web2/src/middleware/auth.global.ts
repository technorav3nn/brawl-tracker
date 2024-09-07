import type { User } from "$server/db/schema/users";

export default defineNuxtRouteMiddleware(async () => {
	const user = useUser();
	const data = (await useRequestFetch()("/api/auth/user")) as User;
	if (data) {
		user.value = data;
	}
});
