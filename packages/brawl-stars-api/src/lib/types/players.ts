import type { BasicBrawler } from "./brawlers";
import type { Gadget, StarPower, Gear } from "./powers";

export interface Player {
	"3vs3Victories": number;
	bestRoboRumbleTime: number;
	bestTimeAsBigBrawler: number;
	club: PlayerClubInfo;
	duoVictories: number;
	expLevel: number;
	expPoints: number;
	highestTrophies: number;
	icon: PlayerIconInfo;
	isQualifiedFromChampionshipChallenge: boolean;
	name: string;
	nameColor: string;
	soloVictories: number;
	tag: string;
	trophies: number;
}

export interface RankingsPlayer {
	club: PlayerClubInfo;
	icon: PlayerIconInfo;
	name: string;
	nameColor: string;
	rank: number;
	tag: string;
	trophies: number;
}

export interface BasicPlayer {
	brawler: BasicBrawler;
	name: string;
	tag: string;
}

export type StarPlayer = BasicPlayer;

export interface PlayerBrawler {
	gadgets: Gadget[];
	gears: Gear[];
	highestTrophies: number;
	id: number;
	name: string;
	power: number;
	rank: number;
	starPowers: StarPower[];
	trophies: number;
}

export interface PlayerIconInfo {
	id: number;
}

export interface PlayerClubInfo {
	name: string;
	tag: string;
}
