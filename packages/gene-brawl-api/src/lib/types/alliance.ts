/* eslint-disable typescript-sort-keys/interface */
export interface ApiAllianceResponse {
	state: number;
	tag: string;
	response: Response;
}

export interface Response {
	AllianceHeaderEntry: AllianceHeaderEntry;
	AllianceMemberEntries: AllianceMemberEntry[];
	Version: number;
}

export interface AllianceHeaderEntry {
	PreferredLanguage: number;
	AllianceBadge: number;
	Name: string;
	Description: string;
	Score: number;
	Online: number;
	RequiredScore: number;
	AllianceType: number;
	NumberOfMembers: number;
	AllianceId: ID;
	RegionName: string;
	MegaPigInfo: null;
}

export interface ID {
	High: number;
	Low: number;
}

export interface AllianceMemberEntry {
	Trophies: number;
	ProfileIcon: number;
	NameColor: number;
	BrawlPass: number;
	Role: number;
	MegaPig: MegaPig;
	AccountId: ID;
	Name: string;
}

export interface MegaPig {
	Wins: number;
	TIcketsLeft: number;
}
