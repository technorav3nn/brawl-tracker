import { omit } from "$lib/utils/common";
import type { User } from "$server/db/users/types";

export default defineEventHandler((event) => {
	return {
		user: event.context.user,
		databaseUser: omit(event.context.databaseUser!, ["savedPlayers"]) as Omit<User, "savedPlayers">,
	};
});
