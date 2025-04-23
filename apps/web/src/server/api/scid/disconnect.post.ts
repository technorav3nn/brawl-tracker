export default defineEventHandler(async (event) => {
	if (!event.context.user) {
		throw createError({ status: 401, message: "Unauthorized" });
	}

	const auth = useServerAuth();
	await auth.api.updateUser({
		body: { scid: null, tag: null, image: null },
		headers: event.headers,
		query: {
			disableCookieCache: true,
		},
	});

	return { success: true };
});
