import { ID, Query } from "node-appwrite";
import { createAdminClient } from "$lib/appwrite";
import { SESSION_COOKIE } from "$lib/constants";
import { initalizeUser } from "$server/db/users/actions";

export default defineEventHandler(async (event) => {
	const formData = await readFormData(event);

	const email = formData.get("email") as string;
	const password = formData.get("password") as string;
	const name = formData.get("username") as string;
	const turnstileToken = formData.get("token") as string | null;

	if (!turnstileToken) {
		throw createError({ status: 401, message: "No turnstile token provided" });
	}

	const result = await verifyTurnstileToken(turnstileToken);
	if (!result.success) {
		console.log(result["error-codes"], result.hostname, result);
		throw createError({ status: 401, message: "Invalid turnstile token" });
	}

	const { account, users, databases } = createAdminClient();

	const emailUsed = await users.list([Query.equal("email", email), Query.limit(1)]);
	if (emailUsed.users.length > 0) {
		throw createError({ status: 409, message: "Email already taken" });
	}

	const usernameUsed = await users.list([Query.equal("name", name), Query.limit(1)]);
	if (usernameUsed.users.length > 0) {
		throw createError({ status: 409, message: "Username already taken" });
	}

	const user = await account.create(ID.unique(), email, password, name);
	await initalizeUser(user.$id, databases);

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
