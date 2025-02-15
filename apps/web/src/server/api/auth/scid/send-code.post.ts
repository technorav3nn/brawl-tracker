import { sendLoginCode } from "@brawltracker/supercell-id-api";
import { z } from "zod";

const bodySchema = z.object({
	email: z.string().email(),
});

export default defineEventHandler(async (event) => {
	const result = await readValidatedBody(event, (body) => bodySchema.safeParse(body));
	if (!result.success) {
		throw result.error.issues;
	}

	await sendLoginCode(result.data.email, "laser");
});
