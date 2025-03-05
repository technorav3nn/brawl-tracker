import { createSessionClient } from "$lib/appwrite";
import { SESSION_COOKIE } from "$lib/constants";

export default defineEventHandler(async (event) => {
	const { account } = createSessionClient(event);

	await account.deleteSession("current");
	deleteCookie(event, SESSION_COOKIE);

	await sendRedirect(event, "/login");
});
