import { hash } from "@node-rs/argon2";
import { generateIdFromEntropySize } from "lucia";
import { signupUserSchema } from "$lib/validation/user-schema";
import { lucia } from "$server/auth";
import { db } from "$server/db";
import { users } from "$server/db/schema";

export default eventHandler(async (event) => {
	const { success, error, data } = await readValidatedBody(event, (body) => {
		return signupUserSchema.safeParse(body);
	});
	if (!success) {
		throw error.issues;
	}

	const { email, password, username } = data;

	const passwordHash = await hash(password, {
		// recommended minimum parameters
		memoryCost: 19456,
		timeCost: 2,
		outputLen: 32,
		parallelism: 1,
	});
	const userId = generateIdFromEntropySize(10); // 16 characters long

	// TODO: check if username is already used
	try {
		await db.insert(users).values({
			id: userId,
			username,
			email,
			hashedPassword: passwordHash,
		});
	} catch (error) {
		if (error instanceof Error && error.message.includes("duplicate key value violates unique constraint")) {
			throw createError({
				statusMessage:
					"Username or email already taken, or email is in use with Supercell ID. Try using Supercell ID if this is your email or try a different email.",
				statusCode: 400,
			});
		}
	}

	const ip = event.headers.get("x-forwarded-for") || event.node.req.socket.remoteAddress;
	if (!ip) {
		throw createError({
			statusMessage: "Failed to get IP address",
			statusCode: 500,
		});
	}

	const ipCountry = useIpToCountry(ip);

	const session = await lucia.createSession(userId, {
		ipCountry,
	});
	appendHeader(event, "Set-Cookie", lucia.createSessionCookie(session.id).serialize());
});
