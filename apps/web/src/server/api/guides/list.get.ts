import { z } from "zod";

const schema = z.object({
	brawlerId: z.string({ message: "Brawler Id required" }),
});

export default defineEventHandler(async (event) => {
	const { db } = useDrizzle();
	const query = await getValidatedQuery(event, (d) => schema.parse(d));
	const guides = await db.query.guide.findMany({ where: (guide) => eq(guide.brawlerId, query.brawlerId), with: { user: true } });
	if (!guides) {
		throw createError({ statusCode: 404, statusMessage: "Not Found" });
	}

	return guides;
});
