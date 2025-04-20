import { omit } from "$lib/utils/common/objects.js";
import { getUser } from "$server/db/users/actions";
import type { User } from "$server/db/users/types";
import { createSessionClient } from "$server/utils/appwrite";

export default defineEventHandler(async (event) => {
	const user = event.context.user;
	if (!user) {
		// no content
		return;
	}

	const { databases } = createSessionClient(event);

	const { $id } = user;

	const databaseUser = omit(await getUser($id, databases), ["savedPlayers"]);
	return databaseUser as Omit<User, "savedPlayers">;
});
