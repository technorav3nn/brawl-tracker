export default defineNuxtRouteMiddleware(async () => {
	const user = useUser();
	const dbUserState = useDatabaseUser();
	const headers = useRequestHeaders(["Cookie"]);

	if (!headers.cookie) {
		return;
	}

	if (!user.value) {
		const data = await useRequestFetch()("/api/auth/user");
		if (data) {
			user.value = data;
		}
	}

	if (!dbUserState.value) {
		const dbUser = await useRequestFetch()("/api/auth/database-user");
		if (dbUser) {
			dbUserState.value = dbUser;
		}
	}
});
