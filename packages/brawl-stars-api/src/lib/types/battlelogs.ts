import type { Event, GameModes } from "./events";
import type { BasicPlayer, StarPlayer } from "./players";

export interface Battlelog<T = Date> {
	battle: BattlelogBattle;
	battleTime: T;
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

export interface BattlelogsResponse<T = Date> {
	items: Battlelog<T>[];
}

export type BattleResult = "defeat" | "draw" | "victory";
export type BattleTypes = "friendly" | "ranked" | (string & {});
