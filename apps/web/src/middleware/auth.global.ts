export default defineNuxtRouteMiddleware(async () => {
	const user = useUser();
	const dbUserState = useDatabaseUser();

	const data = await useRequestFetch()("/api/auth/user");
	if (data) {
		user.value = data;
	}

	const dbUser = await useRequestFetch()("/api/auth/database-user");
	if (dbUser) {
		dbUserState.value = dbUser;
	}
});
