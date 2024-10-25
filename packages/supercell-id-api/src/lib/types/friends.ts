export interface ScidFriendsResponse {
	data: Data;
	ok: boolean;
}

export interface Data {
	currentFriendCount: number;
	friends: Friend[];
}

export interface Friend {
	applicationAccountId?: string;
	avatarImage: string;
	connectedSystems: string[];
	handle: string;
	name: string;
	playerName?: string;
	presence?: Presence;
	relationship: Relationship;
	scid: string;
}

export interface Relationship {
	status: string;
	timestamp: number;
}

export interface Presence {
	system: string;
	username: string;
}
