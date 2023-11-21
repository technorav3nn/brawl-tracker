export interface Event {
	id: number;
	map: string;
	mode: GameModes;
}

export type GameModes =
	| "basketBrawl"
	| "bigGame"
	| "bossFight"
	| "botDrop"
	| "bounty"
	| "brawlBall"
	| "duels"
	| "duoShowdown"
	| "gemGrab"
	| "heist"
	| "holdTheTrophy"
	| "hotZone"
	| "hunters"
	| "knockout"
	| "lastStand"
	| "loneStar"
	| "payload"
	| "presentPlunder"
	| "roboRumble"
	| "siege"
	| "snowtelThieves"
	| "soloShowdown"
	| "superCityRampage"
	| "takedown"
	| "trophyThieves"
	| "volleyBrawl"
	| "wipeout"
	| (string & {});
