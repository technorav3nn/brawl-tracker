import { z } from "zod";
import { createSessionClient } from "$lib/appwrite";
import { BACKGROUNDS } from "$lib/backgrounds";
import { upsertProfileDoc } from "$server/db/users/actions";

const schema = z.object({
	background: z
		.string()
		.refine((v) => BACKGROUNDS.find((bg) => bg.name === v))
		.nullable(),
	theme: z.string().nullable(),
});

export default defineEventHandler(async (event) => {
	if (!event.context.user) {
		throw createError({ status: 401, message: "Unauthorized" });
	}

	const { $id } = event.context.user;
	const { data, success, error } = await readValidatedBody(event, (b) => schema.safeParse(b));
	if (!success) {
		throw error.issues;
	}

	const { background, theme } = data;
	const { databases } = createSessionClient(event);

	try {
		await upsertProfileDoc(
			$id,
			{
				background: background ?? null,
				theme: theme ?? null,
			},
			databases
		);
	} catch (error) {
		console.error(error);
		throw createError({ status: 500, message: "Failed to update profile" });
	}
});
