import type { StarPower, Gadget } from "./powers";

export interface Brawler {
	gadgets: Gadget[];
	id: number;
	name: string;
	starPowers: StarPower[];
}

export interface BasicBrawler {
	id: number;
	name: string;
	power: number;
	trophies: number;
}

export interface BrawlerListResponse {
	items: Brawler[];
}
