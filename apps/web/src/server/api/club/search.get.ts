import { z } from "zod";

const schema = z.object({
	query: z.string(),
});

export default defineEventHandler(async (event) => {
	const { success, data, error } = await getValidatedQuery(event, (d) => schema.safeParse(d));
	if (!success) throw error.issues;

	const { query } = data;

	const { alliances, ok } = await useRntApi().alliances.search({ query });
	if (!ok) {
		throw createError({
			statusCode: 500,
			statusMessage: "Failed to fetch alliances",
		});
	}

	return alliances;
});
