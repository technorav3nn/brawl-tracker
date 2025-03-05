import { listProfiles } from "@brawltracker/supercell-id-api";
import { z } from "zod";
import { getCachedScidSessionToken } from "$server/utils/session-token";

const schema = z.object({
	input: z.string(),
	type: z.enum(["appAccountIds", "handles", "scids"]).optional().default("scids"),
});

export default defineEventHandler(async (event) => {
	if (!event.context.user) {
		throw createError({ statusCode: 401, statusMessage: "Unauthorized" });
	}

	const query = await getValidatedQuery(event, (query) => schema.safeParse(query));
	if (!query.success) throw query.error.issues;

	const { scidAccountToken } = useRuntimeConfig(event);
	const sessionToken = await getCachedScidSessionToken(scidAccountToken);
	if (!sessionToken) {
		throw createError({ statusCode: 500, statusMessage: "Failed to retrieve session" });
	}

	const { input, type } = query.data;
	console.log(`Fetching profile for ${type} ${input}`);

	try {
		return await listProfiles(sessionToken.token, [input], type ?? "scids");
	} catch {
		throw createError({ statusCode: 500, statusMessage: "Failed to retrieve profile" });
	}
});
