export type SupercellGame = "laser" | "magic" | "sand" | "scroll" | "soil" | "squad";

export interface ScidProfileResponse {
	data?: Profile;
	ok: boolean;
}

export interface Profile {
	availableSystems: AvailableSystem[];
	avatarImage: AvatarImage;
	blockIncomingFriendRequests: boolean;
	characterClass: string;
	connectedSystems: ConnectedSystem[];
	forcedOfflineStatus: boolean;
	handle: Handle;
	hasYoungPlayerAccountsConnected: boolean;
	identifier: Identifier;
	name: Name;
	qrCodeURL: string;
	scid: string;
	supportTier: number;
	universalLink: string;
}

export interface Name {
	changeAllowed: number;
	name: string;
}

export interface AvatarImage {
	image: string;
}

export interface Handle {
	id: string;
	isChangeAllowed: boolean;
}

export interface AvailableSystem {
	appStoreLinks: AppStoreLinks;
	deeplink: string;
	new?: boolean;
	season?: Season;
	seasonPassDeeplink?: string;
	system: string;
}

export interface AppStoreLinks {
	android: string;
	ios: string;
}

export interface Season {
	endTime: number;
	name: string;
	startTime: number;
}

export interface ConnectedSystem {
	application: string;
	applicationAccountId: string;
	progress: string[];
	score: number;
	seasonPassActive: boolean;
	system: string;
	username: string;
}

export interface Identifier {
	type: string;
	value: string;
}
