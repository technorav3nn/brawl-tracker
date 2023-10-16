export interface BrawlApiBrawler {
	avatarId: number;
	class: {
		id: number;
		name: string;
	};
	description: string;
	gadgets: BrawlApiGadget[];
	hash: string;
	id: number;
	imageUrl: string;
	imageUrl2: string;
	imageUrl3: string;
	link: string;
	name: string;
	path: string;
	rarity: {
		color: string;
		id: number;
		name: string;
	};
	released: boolean;
	starPowers: BrawlApiStarPower[];
	unlock: null;
	version: number;
	videos: BrawlApiVideo[];
}

export interface BrawlApiGetAllBrawlersResponse {
	list: BrawlApiBrawler[];
}

export interface BrawlApiClub {
	club: {
		description: string;
		memberCount: number;
		name: string;
		requiredTrophies: number;
		tag: string;
		trophies: number;
		updated: {
			data: number;
			history: number;
		};
	};
	history: BrawlApiClubHistory[];
}

export interface BrawlApiEvents {
	active: BrawlApiEvent[];
	upcoming: BrawlApiEvent[];
}

export interface BrawlApiEventStats {
	brawler1: number;
	brawler2: number;
	brawler3: number;
	data: {
		draws: number;
		losses: number;
		total: number;
		useRate: number;
		winRate: number;
		wins: number;
	};
	hash: string;
	name: string;
}

export interface BrawlApiEventTeamStats {
	brawler1: number;
	brawler2: number;
	brawler3: number;
	data: {
		draws: number;
		losses: number;
		total: number;
		useRate: number;
		winRate: number;
		wins: number;
	};
	hash: string;
	name: string;
}

export interface BrawlApiEvent {
	endTime: string;
	map: BrawlApiMap;
	modifier: null;
	reward: number;
	slot: {
		background: string;
		hash: string;
		hideForSlot: null;
		hideable: boolean;
		id: number;
		listAlone: boolean;
		name: string;
	};
	startTime: string;
	teamStats: BrawlApiEventTeamStats[];
}

export interface BrawlApiIcon {
	brawler: number | null;
	id: number;
	imageUrl: string;
	imageUrl2: string;
}

export interface BrawlApiIconsResponse {
	club: BrawlApiIcon[];
	player: BrawlApiIcon[];
}

export interface BrawlApiMaps {
	list: BrawlApiMap[];
}

export interface BrawlApiMap {
	credit: null;
	dataUpdated: null;
	disabled: boolean;
	environment: {
		hash: string;
		id: number;
		imageUrl: string;
		name: string;
		path: string;
		version: number;
	};
	gameMode: BrawlApiGameMode;
	hash: string;
	id: number;
	imageUrl: string;
	lastActive: number;
	link: string;
	name: string;
	new: boolean;
	stats: [];
	teamStats: [];
	version: number;
}

export interface BrawlApiGameModes {
	list: BrawlApiGameMode[];
}

export interface BrawlApiGameMode {
	color: string;
	description: string;
	disabled: boolean;
	hash: string;
	id: number;
	imageUrl: string;
	imageUrl2: string;
	link: string;
	name: string;
	scHash: string;
	shortDescription: string;
	sort1: number;
	sort2: number;
	title: string;
	tutorial: string;
	version: number;
}

export interface BrawlApiStarPower {
	description: string;
	id: number;
	imageUrl: string;
	name: string;
	path: string;
	released: boolean;
	version: number;
}

export interface BrawlApiGadget {
	description: string;
	id: number;
	imageUrl: string;
	name: string;
	path: string;
	released: boolean;
	version: number;
}

export interface BrawlApiVideo {
	description: string;
	duration: string;
	name: string;
	previewUrl: string;
	type: number;
	uploadDate: string;
	videoUrl: string;
}

export interface BrawlApiClubHistory {
	data: {
		joined: boolean;
		player: {
			name: string;
			tag: string;
		};
	};
	timestamp: number;
	type: string;
}

export type BrawlerRating = 1 | 2 | 3 | 4 | 5;

export interface CsvBrawler {
	DefenseRating: BrawlerRating;
	Hitpoints: number;
	OffenseRating: BrawlerRating;
	Speed: number;
	UtilityRating: BrawlerRating;
	id: number;
}
