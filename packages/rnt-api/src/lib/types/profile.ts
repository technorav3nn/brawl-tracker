import type { ApiResponse } from "./response";

export type RawProfileResponse = ApiResponse<RawProfile>;

export interface RawProfile {
	account_tag: RawProfileAccountTag;
	favorite_brawler: number;
	winstreak_brawler: number;
	brawler_count: number;
	brawlers: RawProfileBrawler[];
	stats: RawProfileStat[];
	name: string;
	unk1: number;
	profile_avatar: number;
	name_color: number;
	brawlpass: number;
	has_unk_field: boolean;
	unk_field: number;
	unk_string: string;
	unk6: number;
	unk7: number;
	max_winstreak: number;
	battle_card: RawProfileBattleCard;
	is_in_alliance: boolean;
	alliance: RawProfileAlliance;
}

export interface RawProfileAccountTag {
	hi: number;
	lo: number;
	tag: string;
}

export interface RawProfileAlliance {
	unk1: number;
	id: RawProfileAccountTag;
	name: string;
	badge: number;
	type: number;
	member_count: number;
	trophies: number;
	minimum_trophies: number;
	region: string;
	members_online: number;
	is_family_friendly: boolean;
	unk7: number;
	unk_count: number;
	unk8: number;
	unk9: number;
	unk_count2: number;
	unk10: number;
	unk11: number;
}

export interface RawProfileBattleCard {
	favorite_skin: number;
	first_profile_avatar: number;
	second_profile_avatar: number;
	battle_card_emote: number;
	title: number;
}

export interface RawProfileBrawler {
	brawler_id: number;
	skin_equipped: number;
	trophies: number;
	highest_trophies: number;
	highest_season_tropies: number;
	power_level: number;
	mastery: number;
}

export interface RawProfileStat {
	id: number;
	name: string;
	value: number;
}
