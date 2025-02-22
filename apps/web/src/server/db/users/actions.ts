import { Permission, Role, type Databases } from "node-appwrite";
import { type ScidConnection, type User, type Document } from "./types";

export async function getUser(userId: string, databases: Databases) {
	return databases.getDocument<Document<User>>("brawltrack", "users", userId);
}

/**
 * Used when creating an account
 */
export async function initalizeUser(userId: string, databases: Databases) {
	try {
		await databases.getDocument("brawltrack", "users", userId);
	} catch {
		return await databases.createDocument(
			"brawltrack",
			"users",
			userId,
			{
				userId,
				scidConnections: {
					isConnected: false,
				},
			},
			[Permission.read(Role.user(userId)), Permission.write(Role.user(userId))]
		);
	}
}

export async function upsertSupercellIdDoc(userId: string, scidInfo: ScidConnection, databases: Databases) {
	try {
		return await databases.updateDocument("brawltrack", "scidConnections", userId, scidInfo, [
			Permission.read(Role.user(userId)),
			Permission.write(Role.user(userId)),
		]);
	} catch {
		return await databases.createDocument("brawltrack", "scidConnections", userId, scidInfo, [
			Permission.read(Role.user(userId)),
			Permission.write(Role.user(userId)),
		]);
	}
}

export async function upsertUserDoc(userId: string, data: Partial<User>, databases: Databases) {
	try {
		return await databases.updateDocument("brawltrack", "users", userId, data, [
			Permission.read(Role.user(userId)),
			Permission.write(Role.user(userId)),
		]);
	} catch {
		return await databases.createDocument("brawltrack", "users", userId, data, [
			Permission.read(Role.user(userId)),
			Permission.write(Role.user(userId)),
		]);
	}
}

export async function isSupercellIdConnected(userId: string, databases: Databases) {
	try {
		const data = await databases.getDocument<Document<ScidConnection>>("brawltrack", "scidConnections", userId);
		return Boolean(data.scid);
	} catch {
		return false;
	}
}
