import { getProfile } from "@brawltracker/supercell-id-api";
import { z } from "zod";
import { createSessionClient } from "$lib/appwrite";
import { getScidSessionToken } from "$server/db/users/actions";

const schema = z.object({
	scid: z.string().optional(),
});

export default defineEventHandler(async (event) => {
	if (!event.context.user) {
		throw createError({ statusCode: 401, statusMessage: "Unauthorized" });
	}

	const query = await getValidatedQuery(event, (query) => schema.safeParse(query));
	if (!query.success) throw query.error.issues;

	const { databases } = createSessionClient(event);

	const sessionToken = await getScidSessionToken(event.context.user.$id, databases);
	if (!sessionToken) {
		throw createError({ statusCode: 500, statusMessage: "Failed to retrieve session" });
	}

	const { scid } = query.data;

	return await getProfile(sessionToken, scid);
});
