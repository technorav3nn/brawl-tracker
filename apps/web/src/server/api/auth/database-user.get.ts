import { createSessionClient } from "$lib/appwrite";
import { omit } from "$lib/utils/common/objects.js";
import { getUser } from "$server/db/users/actions";
import type { User } from "$server/db/users/types";

export default defineEventHandler(async (event) => {
	const user = event.context.user;
	if (!user) {
		throw createError({ statusMessage: "Unauthorized", statusCode: 401 });
	}

	const { databases } = createSessionClient(event);

	const { $id } = user;

	const databaseUser = omit(await getUser($id, databases), ["savedPlayers"]);
	return databaseUser as Omit<User, "savedPlayers">;
});
