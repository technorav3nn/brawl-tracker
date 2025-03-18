import { createAdminClient } from "$lib/appwrite";
import { SESSION_COOKIE } from "$lib/constants";

export default defineEventHandler(async (event) => {
	const formData = await readFormData(event);

	const email = formData.get("email") as string;
	const password = formData.get("password") as string;
	const turnstileToken = formData.get("token") as string | null;

	if (!turnstileToken) {
		throw createError({ status: 401, message: "No turnstile token provided" });
	}

	const result = await verifyTurnstileToken(turnstileToken);
	if (!result.success) {
		console.log(result["error-codes"], result.hostname, result);
		throw createError({ status: 401, message: "Invalid turnstile token" });
	}

	const { account } = createAdminClient();

	const session = await account.createEmailPasswordSession(email, password);

	setCookie(event, SESSION_COOKIE, session.secret, {
		expires: new Date(session.expire),
		path: "/",
		httpOnly: true,
		secure: true,
		sameSite: "none",
	});

	await sendRedirect(event, "/");
});
