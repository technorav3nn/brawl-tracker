import type { User } from "$server/utils/auth";

export default defineEventHandler(async (event) => {
	const auth = useServerAuth();
	try {
		const headers = event.headers;
		const session = await auth.api.getSession({
			headers,
		});
		if (!session) {
			throw createError({
				status: 401,
				message: "Unauthorized",
			});
		}

		// Inject the user id so it can be used in subsequent requests.
		 
		event.context.user = session.user;
	} catch {
		// Ignore error
	}
});

declare module "h3" {
	interface H3EventContext {
		user?: User;
		databaseUser?: Omit<User, "savedPlayers">;
	}
}
