import type { Models } from "node-appwrite";
import { createSessionClient } from "$lib/appwrite";

export default defineEventHandler(async (event) => {
	const { account } = createSessionClient(event);

	try {
		// eslint-disable-next-line require-atomic-updates
		event.context.user = await account.get();
	} catch {}
});

declare module "h3" {
	interface H3EventContext {
		user?: Models.User<Models.Preferences>;
	}
}
