/* eslint-disable typescript-sort-keys/interface */
export type GearData = Record<string, Gear>;

export interface Gear {
	name: string;
	rarity: string;
	description: string;
	modifierType: string;
	/**
	 * The exact boost the gear gives
	 */
	modifierValue: number;
	/**
	 * The brawlers the gear is avaliable to, if null then it's avaliable to all brawlers
	 * I.e. reload speed is avaliable to a certain subset, but speed or damage is avaliable to all
	 * So it would be `null` for speed and damage, but an array of brawler IDs for reload speed
	 */
	brawlersAvaliableTo: number[] | null;
}
