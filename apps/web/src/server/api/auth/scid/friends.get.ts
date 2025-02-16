// import { getFriends } from "@brawltracker/supercell-id-api";
// import { createSessionClient } from "$lib/appwrite";
// import { getScidSessionToken } from "$server/db/users/actions";

export default defineEventHandler(async () => {
	// if (!event.context.user) {
	// 	throw createError({ statusCode: 401, statusMessage: "Unauthorized" });
	// }
	// const { databases } = createSessionClient(event);
	// const sessionToken = await getScidSessionToken(event.context.user.$id, databases);
	// if (!sessionToken) {
	// 	throw createError({ statusCode: 500, statusMessage: "Failed to retrieve session" });
	// }
	// return await getFriends(sessionToken);
});
