import { defineNuxtPlugin } from "#app";
import { useRequestEvent, useRequestFetch, useUser, useDatabaseUser } from "#imports";

export default defineNuxtPlugin({
	name: "session-fetch-plugin",
	enforce: "pre",
	async setup() {
		// Do nothing during prerendering
		if (import.meta.prerender) {
			return;
		}

		// During SSR-rendering, the user is already set by the server middleware
		// we don't need to fetch it again from the database
		// Grab the user from the request event and set it in the store
		if (import.meta.server) {
			const event = useRequestEvent();
			useUser().value = useRequestEvent()?.context.user || null;
			useDatabaseUser().value = event?.context.databaseUser || null;
			return;
		}

		let user = useUser().value;
		let dbUser = useDatabaseUser().value;

		// In SPA mode, fetch the current session from the server
		// Only fetch the user if it's not already set server-side
		if (typeof user === "undefined" || typeof dbUser === "undefined") {
			try {
				const data = await useRequestFetch()("/api/auth/user", {
					retry: false,
					headers: {
						Accept: "application/json",
					},
				});
				if (data.user) {
					user = data.user;
				}

				if (data.databaseUser) {
					dbUser = data.databaseUser;
				}
			} catch (error) {
				if (import.meta.dev) {
					console.error("[SessionPlugin]: ", error);
				}
			}

			// Always set the user even in case of an error
			// That because the user is initialized to undefined to indicate that
			// the session has never been fetched
			// In our case, we did fetch the session
			useUser().value = user || null;
		}
	},
});
