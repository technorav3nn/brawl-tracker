import { DrizzlePostgreSQLAdapter } from "@lucia-auth/adapter-drizzle";
import { Discord } from "arctic";
import { Lucia, TimeSpan } from "lucia";
import { db } from "$server/db";
import { sessions, users, type User } from "$server/db/schema/users";

const { discordClientId, discordClientSecret, authOrigin } = useRuntimeConfig();

export const lucia = new Lucia(new DrizzlePostgreSQLAdapter(db, sessions, users), {
	getUserAttributes: (attributes) => {
		return {
			id: attributes.id,
			username: attributes.username,
			email: attributes.email,
			createdAt: attributes.createdAt,
			updatedAt: attributes.updatedAt,
			supercellId: attributes.supercellId,
			scidApiSessionToken: attributes.scidApiSessionToken,
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

export const discord = new Discord(
	discordClientId,
	discordClientSecret,
	`${import.meta.dev ? `localhost:3000` : authOrigin}/"/login/discord/callback"`
);

declare module "lucia" {
	interface Register {
		Lucia: typeof lucia;
		DatabaseSessionAttributes: DatabaseSessionAttributes;
		DatabaseUserAttributes: DatabaseUserAttributes;
	}
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface DatabaseSessionAttributes {}
interface DatabaseUserAttributes extends Omit<User, "hashedPassword"> {}