import type { Gear } from "./gears";

type RepeatTuple<T, N extends number, R extends unknown[]> = R["length"] extends N ? R : RepeatTuple<T, N, [T, ...R]>;

export interface BrawlerKitAttack {
	description: string;
	name: string;
	stats: Record<string, string>;
	statsByLevel: {
		list: RepeatTuple<number, 11, []>;
		name: string;
	}[];
}

 
export interface BrawlerData {
	/**
	 * Normalized name
	 *
	 * @example "El Primo", normalized is "el_primo"
	 */
	id: string;
	/**
	 * The Wiki URL
	 */
	url: string;
	name: string;
	directory: string;
	description: string;
	stats: {
		rarity: string;
		class: string;
		/**
		 * Long description of the movement speed
		 */
		movementspeed: string;
		voiceactor: string;
	};
	gadgets: {
		name: string;
		description: string;
		id: string;
		/**
		 * Path to the image relative to the cdn root url
		 */
		path: string;
	}[];
	starpowers: {
		name: string;
		description: string;
		id: string;
		/**
		 * Path to the image relative to the cdn root url
		 */
		path: string;
	}[];
	tips: string[];
	/**
	 * Voicelines unsupported
	 */
	voicelines: unknown[];
	history: {
		date: string;
		description: string;
		type: "Buff" | "Nerf" | "Neutral";
	}[];
	skins: {
		name: string;
		path: string;
		/**
		 * Cost, if any (doesnt exist for default skin)
		 */
		cost?: string;
		/**
		 * Campaign, if any (doesnt exist for default skin or skins that arent from a campaign)
		 * A campaign is like the Brawl Pass or Wasteland skins, etc.
		 */
		campaign?: string;
		/**
		 * Rarity, if any
		 * E.g. Super Rare, Epic, etc.
		 */
		 
		rarity?: "Rare" | "Super Rare" | "Epic" | "Mythic" | "Legendary" | "Hypercharge";
	}[];
	/**
	 * Hypercharge, if any, empty array if none
	 */
	hypercharge: {
		name: string;
		description: string;
		/**
		 * Path to the hypercharge image relative to the cdn root url
		 */
		path: string;
		stats: Record<string, string>;
	} | null;

	healthByLevel: RepeatTuple<number, 11, []>;
	attack: BrawlerKitAttack;
	super: BrawlerKitAttack;
	model: {
		path: string;
	};
	avatar: {
		path: string;
	};
	/**
	 * The special gears the brawler has, super rare gears don't count
	 * Only epic gears like Reload Speed or mythic gears like Sticky Spikes count
	 */
	gears?: Gear[];
}
