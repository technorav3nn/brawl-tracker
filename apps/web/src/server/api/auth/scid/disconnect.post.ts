import { createSessionClient } from "$server/utils/appwrite";
import { upsertProfileDoc } from "$server/db/users/actions";

export default defineEventHandler(async (event) => {
	if (!event.context.user) {
		throw createError({ status: 401, message: "Unauthorized" });
	}

	const { databases } = createSessionClient(event);
	await upsertProfileDoc(
		event.context.user.$id,
		{
			isConnected: false,
			username: null,
			avatar: null,
			qrCodeUrl: null,
			universalLink: null,
			scid: null,
			tag: null,
		},
		databases
	);
	return { success: true };
});
