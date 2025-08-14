export interface RawAllianceSearchResponse {
	credit: string;
	ok: boolean;
	result: {
		alliances: RawAllianceSearchAlliance[];
		result_count: number;
	};
}

export interface RawAllianceSearchAlliance {
	badge: number;
	id: {
		hi: number;
		lo: number;
		tag: string;
	};
	member_count: number;
	minimum_trophies: number;
	name: string;
	online_players: number;
	region: string;
	trophies: number;
	type: number;
	unk4: number;
	unk5: number;
	unk6: boolean;
	unk7: number;
	unk_count: number;
	unk_count2: number;
}

export type ClubType = "open" | "invite-only" | "closed";
export interface AllianceSearchOptions {
	query: string;
	// Currently unused, api doesn't support it yet
	// maximumMembers?: number;
	// minimumMembers?: number;
	// minimumTrophies?: number;
	// findOnlyJoinable?: boolean;
}
