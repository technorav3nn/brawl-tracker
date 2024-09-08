import { verify } from "@node-rs/argon2";
import { and } from "drizzle-orm";
import { validEmail } from "$lib/utils/common";
import { lucia } from "$server/auth";
import { db } from "$server/db";

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

	// const existingUser = await db.select().from(users).where(eq(users.username, username)).limit(1);
	const existingUser = await db.query.users.findFirst({
		where: (users, { eq }) => and(eq(users.email, email)),
	});
	if (!existingUser) {
		throw createError({
			statusMessage: "Incorrect username or password",
			statusCode: 400,
		});
	}

	if (!existingUser.hashedPassword) {
		throw createError({
			statusMessage: "Account authenticated with a provider like Supercell, please login that way.",
			statusCode: 400,
		});
	}

	const validPassword = await verify(existingUser.hashedPassword!, password, {
		memoryCost: 19456,
		timeCost: 2,
		outputLen: 32,
		parallelism: 1,
	});
	if (!validPassword) {
		throw createError({
			statusMessage: "Incorrect username or password",
			statusCode: 400,
		});
	}

	const session = await lucia.createSession(existingUser.id, {});
	appendHeader(event, "Set-Cookie", lucia.createSessionCookie(session.id).serialize());
});

// NOTE:
// Returning immediately allows malicious actors to figure out valid usernames from response times,
// allowing them to only focus on guessing passwords in brute-force attacks.
// As a preventive measure, you may want to hash passwords even for invalid usernames.
// However, valid usernames can be already be revealed with the signup page among other methods.
// It will also be much more resource intensive.
// Since protecting against this is non-trivial,
// it is crucial your implementation is protected against brute-force attacks with login throttling etc.
// If usernames are public, you may outright tell the user that the username is invalid.
