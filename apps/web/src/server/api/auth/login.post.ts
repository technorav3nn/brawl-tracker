import { createAdminClient } from "$lib/appwrite";
import { SESSION_COOKIE } from "$lib/constants";

export default defineEventHandler(async (event) => {
	const formData = await readFormData(event);

	const email = formData.get("email") as string;
	const password = formData.get("password") as string;

	const { account } = createAdminClient();

	const session = await account.createEmailPasswordSession(email, password);
	console.log(session.$id, useRuntimeConfig(event));

	setCookie(event, SESSION_COOKIE, session.secret, {
		expires: new Date(session.expire),
		path: "/",
		httpOnly: true,
		secure: true,
		sameSite: "none",
	});

	await sendRedirect(event, "/");
});
