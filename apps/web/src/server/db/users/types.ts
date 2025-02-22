import type { Models } from "node-appwrite";

export interface JSONSavedPlayer {
	isScid?: boolean;
	scidData?: {
		avatarImage: string;
		name: string;
		handle?: string;
		scid: string;
	};
	tag?: string;
	name: string;
}

export interface User {
	userId: string;
	scidConnections: ScidConnection;
	/**
	 * JSON string, remember to parse it
	 */
	savedPlayers: string;
}

export interface UserPreferences extends Models.Preferences {
	avatar: string;
	savedTags: string[];
}

export interface ScidConnection {
	isConnected: boolean;

	// Below are fields that are only initalized when the user connects their SCID
	username: string | null;
	avatar?: string | null;
	qrCodeUrl?: string | null;
	universalLink?: string | null;
	scid?: string | null;
	tag?: string | null;
}

export type Document<T> = Models.Document & T;
