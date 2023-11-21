import type { Event, GameModes } from "./events";
import type { BasicPlayer, StarPlayer } from "./players";

export interface Battlelog {
	battleTime: Date;
	event: Event;
}

export interface BattlelogBattle {
	duration: number;
	mode: GameModes;
	players: BasicPlayer[] | null;
	result: BattleResult;
	starPlayer: StarPlayer | null;
	teams: BattlelogTeam[] | null;
	type: BattleTypes;
}

export type BattlelogTeam = BasicPlayer[];

export interface BattlelogsResponse {
	items: Battlelog[];
}

export type BattleResult = "defeat" | "draw" | "victory";
export type BattleTypes = "friendly" | "ranked" | (string & {});
