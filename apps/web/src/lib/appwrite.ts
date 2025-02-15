import type { H3Event } from "h3";
import { Client, Account, Databases, Users } from "node-appwrite";

export const SESSION_COOKIE = "brawltrack";

export function createAdminClient() {
	const config = useRuntimeConfig();
	const client = new Client()
		.setEndpoint(config.appwriteEndpoint)
		.setProject(config.appwriteProjectId)
		.setKey(config.appwriteApiToken);

	return {
		get account() {
			return new Account(client);
		},
		get databases() {
			return new Databases(client);
		},
		get users() {
			return new Users(client);
		},
	};
}

export function createSessionClient(event: H3Event) {
	const config = useRuntimeConfig(event);

	const client = new Client().setEndpoint(config.appwriteEndpoint).setProject(config.appwriteProjectId);

	const session = getCookie(event, SESSION_COOKIE);
	if (session) {
		client.setSession(session);
	}

	return {
		get account() {
			return new Account(client);
		},
		get databases() {
			return new Databases(client);
		},
	};
}
