import type { Models } from "node-appwrite";
import { createSessionClient } from "$lib/appwrite";
import { omit } from "$lib/utils/common";
import { getUser } from "$server/db/users/actions";
import type { User } from "$server/db/users/types";

export default defineEventHandler(async (event) => {
	const { account, databases } = createSessionClient(event);

	try {
		// eslint-disable-next-line require-atomic-updates
		event.context.user = await account.get();
		// eslint-disable-next-line require-atomic-updates
		event.context.databaseUser = omit(await getUser(event.context.user.$id, databases), ["savedPlayers"]) as Omit<
			User,
			"savedPlayers"
		>;
	} catch {}
});

declare module "h3" {
	interface H3EventContext {
		user?: Models.User<Models.Preferences>;
		databaseUser?: Omit<User, "savedPlayers">;
	}
}
