import { ID, Query } from "node-appwrite";
import { createAdminClient } from "$lib/appwrite";
import { SESSION_COOKIE } from "$lib/constants";
import { initalizeUser } from "$server/db/users/actions";

export default defineEventHandler(async (event) => {
	const formData = await readFormData(event);

	const email = formData.get("email") as string;
	const password = formData.get("password") as string;
	const name = formData.get("username") as string;

	const { account, users, databases } = createAdminClient();

	const emailUsed = await users.list([Query.equal("email", email), Query.limit(1)]);
	if (emailUsed.users.length > 0) {
		return await sendRedirect(event, "/signup?error=email-used", 301);
	}

	const usernameUsed = await users.list([Query.equal("name", name), Query.limit(1)]);
	if (usernameUsed.users.length > 0) {
		return await sendRedirect(event, "/signup?error=username-used", 301);
	}

	const user = await account.create(ID.unique(), email, password, name);
	await initalizeUser(user.$id, databases);
	console.log(`User ${user.$id} signed up`);

	const session = await account.createEmailPasswordSession(email, password);
	console.log("Session:", session);

	setCookie(event, SESSION_COOKIE, session.secret, {
		expires: new Date(session.expire),
		path: "/",
		httpOnly: true,
		secure: true,
		sameSite: "strict",
	});

	await sendRedirect(event, "/");
});
