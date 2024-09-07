import { hash } from "@node-rs/argon2";
import { generateIdFromEntropySize } from "lucia";
import { validEmail } from "$lib/utils/common";
import { lucia } from "$server/auth";
import { db } from "$server/db";
import { users } from "$server/db/schema/users";

export default eventHandler(async (event) => {
	const formData = await readFormData(event);
	const username = formData.get("username");
	const email = formData.get("email");

	if (
		typeof username !== "string" ||
		username.length < 3 ||
		username.length > 31 ||
		/^[\d_a-z]+$/.test(username)
	) {
		throw createError({
			statusMessage: "Invalid username",
			statusCode: 400,
		});
	}

	if (typeof email !== "string" || email.length < 3 || email.length > 255 || !validEmail(email)) {
		throw createError({
			statusMessage: "Invalid email",
			statusCode: 400,
		});
	}

	const password = formData.get("password");
	if (typeof password !== "string" || password.length < 6 || password.length > 255) {
		throw createError({
			statusMessage: "Invalid password",
			statusCode: 400,
		});
	}

	const passwordHash = await hash(password, {
		// recommended minimum parameters
		memoryCost: 19456,
		timeCost: 2,
		outputLen: 32,
		parallelism: 1,
	});
	const userId = generateIdFromEntropySize(10); // 16 characters long

	// TODO: check if username is already used
	await db.insert(users).values({
		id: userId,
		username,
		email,
		hashedPassword: passwordHash,
	});

	const session = await lucia.createSession(userId, {});
	appendHeader(event, "Set-Cookie", lucia.createSessionCookie(session.id).serialize());
});
