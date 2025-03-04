/* eslint-disable typescript-sort-keys/interface */
export interface CdnBrawler {
	attribution: string;
	shortDescription: string;
	fullDescription: string;
	attack: Attack;
	super: Attack;
	hypercharge: Attack;
	healthByLevel: number[];
	stats: Stats;
	tips: string[];
	model: Avatar;
	avatar: Avatar;
	skins: Skin[];
	history: History[];
	gadgets: Attack[];
	starpowers: Attack[];
}

export interface Attack {
	name: string;
	description: string;
	stats?: Stat[];
	statsByLevel?: StatsByLevel[];
	asset?: Avatar;
}

export interface Avatar {
	filename: string;
	sourceUrl: string;
}

export interface Stat {
	label: string;
	value: string;
}

export interface StatsByLevel {
	name: string;
	levels: number[];
	values: number[];
}

export interface History {
	kind: Kind;
	date: Date;
	description: string;
}

export enum Kind {
	Buff = "Buff",
	Nerf = "Nerf",
	Neutral = "Neutral",
}

export interface Skin {
	name: string;
	exclusive: boolean;
	seasonal: boolean;
	asset: Avatar;
	petSkins: any[];
	pins: Pin[];
	voicelines: Voiceline[];
	sprays: Spray[];
	profileIcons: Avatar[];
	rarity?: string;
	campaign?: string;
	cost?: string;
}

export interface Pin {
	asset: Avatar;
	rarity: string;
	emote: string;
}

export interface Spray {
	asset: Avatar;
	rarity: string;
}

export interface Voiceline {
	trigger: string;
	description: string;
	asset: Avatar;
}

export interface Stats {
	rarity: string;
	class: string;
	movementspeed: string;
	voiceactor: string;
}
