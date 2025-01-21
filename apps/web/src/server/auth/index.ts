import { DrizzlePostgreSQLAdapter } from "@lucia-auth/adapter-drizzle";
import { Lucia, TimeSpan } from "lucia";
import { db } from "$server/db";
import { sessions, users, type User } from "$server/db/schema";

export const lucia = new Lucia(new DrizzlePostgreSQLAdapter(db, sessions, users), {
	getUserAttributes: (attributes) => {
		return {
			id: attributes.id,
			username: attributes.username,
			email: attributes.email,
			createdAt: attributes.createdAt,
			updatedAt: attributes.updatedAt,
			supercellId: attributes.supercellId,
			sessionToken: attributes.__ATTRIBUTES__sessionToken,
			savedPlayerTags: attributes.savedPlayerTags,
			savedClubTags: attributes.savedClubTags,
		};
	},
	getSessionAttributes: (attributes) => {
		return {
			ipCountry: attributes.ipCountry,
		};
	},
	sessionExpiresIn: new TimeSpan(14, "d"),
	sessionCookie: {
		name: "session",
		expires: false, // session cookies have very long lifespan (2 years)
		attributes: {
			secure: !import.meta.dev,
		},
	},
});

declare module "lucia" {
	interface Register {
		Lucia: typeof lucia;
		DatabaseSessionAttributes: DatabaseSessionAttributes;
		DatabaseUserAttributes: DatabaseUserAttributes;
	}
}

interface DatabaseSessionAttributes {
	ipCountry: string;
}
interface DatabaseUserAttributes extends Omit<User, "hashedPassword"> {}
