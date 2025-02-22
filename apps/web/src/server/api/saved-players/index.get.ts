import { createSessionClient } from "$lib/appwrite";
import { getUser } from "$server/db/users/actions";
import type { JSONSavedPlayer } from "$server/db/users/types";

export default defineEventHandler(async (event) => {
	const user = event.context.user;
	if (!user) {
		throw createError({ statusCode: 401, statusMessage: "Unauthorized" });
	}

	const { databases } = createSessionClient(event);

	const { savedPlayers } = await getUser(user.$id, databases);
	return JSON.parse(savedPlayers) as JSONSavedPlayer[];
});
