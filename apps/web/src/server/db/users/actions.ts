import { Permission, Query, Role, type Databases } from "node-appwrite";
import { type PlayerProfile, type User, type Document } from "./types";

export async function getUser(userId: string, databases: Databases, queries?: string[]) {
	return databases.getDocument<Document<User>>("brawltrack", "users", userId, queries);
}

export async function findProfileByTag(tag: string, databases: Databases) {
	return databases.listDocuments<Document<PlayerProfile>>("brawltrack", "profile", [Query.equal("tag", tag)]);
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
				profile: {
					$id: userId,
					isConnected: false,
				},
			},
			[Permission.read(Role.user(userId)), Permission.write(Role.user(userId))]
		);
	}
}

export async function upsertProfileDoc(userId: string, data: Partial<PlayerProfile>, databases: Databases) {
	try {
		return await databases.updateDocument("brawltrack", "profile", userId, data, [
			Permission.read(Role.user(userId)),
			Permission.write(Role.user(userId)),
		]);
	} catch {
		return await databases.createDocument("brawltrack", "profile", userId, data, [
			Permission.read(Role.user(userId)),
			Permission.write(Role.user(userId)),
		]);
	}
}

export async function userWithTagExists(tag: string, databases: Databases) {
	const data = await findProfileByTag(tag, databases);
	return Boolean(data.documents.length);
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
		const data = await databases.getDocument<Document<PlayerProfile>>("brawltrack", "profile", userId);
		return Boolean(data.scid);
	} catch {
		return false;
	}
}
