import type { PlayerIconInfo } from "./players";

export interface Club {
	badgeId: number;
	description: string;
	members: ClubMember[];
	name: string;
	requiredTrophies: number;
	tag: string;
	trophies: number;
	type: Club;
}

export interface RankingClub {
	badgeId: number;
	memberCount: number;
	name: string;
	rank: number;
	tag: string;
	trophies: number;
}

export interface ClubMember {
	icon: PlayerIconInfo;
	name: string;
	nameColor: string;
	role: ClubRole;
	tag: string;
	trophies: number;
}

export interface ClubGetMembersResponse {
	items: ClubMember[];
}

export type ClubRole = "member" | "notMember" | "president" | "senior" | "unknown" | "vicePresident";
export type ClubType = "closed" | "inviteOnly" | "open" | "unknown";
