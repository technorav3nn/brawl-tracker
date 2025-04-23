import { z } from "zod";
import { BACKGROUNDS } from "$lib/backgrounds";

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

	const { data, success, error } = await readValidatedBody(event, (b) => schema.safeParse(b));
	if (!success) {
		throw error.issues;
	}

	const { background, theme } = data;
	const auth = useServerAuth();
	try {
		await auth.api.updateUser({ headers: event.headers, body: { background, theme } });
	} catch (error) {
		console.error(error);
		throw createError({ status: 500, message: "Failed to update user profile config" });
	}

	return { background, theme };
});
