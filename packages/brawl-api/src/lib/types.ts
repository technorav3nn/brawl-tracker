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

export type BrawlApiLeagueEvent = BrawlApiEvent;

export interface BrawlApiLeagueEventsResponse {
	active: BrawlApiLeagueEvent[];
	upcoming: [];
}

export interface BrawlApiMapBrawlerStats {
	brawler: string;
	starRate: number;
	useRate: number;
	winRate: number;
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

export interface BrawlApiPlayerIcon {
	// This should only be a number but the api currently returns null
	brawler: number | null;
	id: number;
	imageUrl: string;
	imageUrl2: string;
	isAvailableForOffers: boolean;
	isReward: boolean;
	name: string;
	name2: string;
	requiredTotalTrophies: number;
	sortOrder: number;
}

export interface BrawlApiClubIcon {
	id: number;
	imageUrl: string;
}

export interface BrawlApiIconsResponse {
	club: Record<string, BrawlApiClubIcon>;
	player: Record<string, BrawlApiPlayerIcon>;
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
	stats: BrawlApiMapBrawlerStats[];
	teamStats: BrawlApiEventTeamStats[] | [];
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

export interface BrawlApiLocation {
	clubs: boolean;
	hash: string;
	hash2: string;
	name: string;
	players: boolean;
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

export interface CsvSkinCampaign {
	BgItemName: string;
	BgOfferPopup: string;
	BundledUnderCatalogCategory: string | null;
	CampaignIconExportName: string;
	CatalogDescriptionTID: string | null;
	CatalogNameOverrideTID: string | null;
	CatalogSortingOrder: number;
	DisabledFromCatalog: boolean;
	EmoteBundleName: string | null;
	InfoTID: string | null;
	Name: string;
	NameTID: string;
	ShowInCatalogCollectionsSection: boolean;
	SkinBuyRequiresExclusiveOption: boolean;
	id: number;
}

export interface CsvSkin {
	BattleIntroVFX: boolean;
	BattleIntroXOffset: number;
	BattleIntroZOffset: number;
	BlueSpecular: string;
	BlueTexture: string;
	Campaigns: string[] | string;
	CatalogNewDaysAdjustment: number;
	CatalogPreRequirementSkin: string | null;
	CommunityCredit: string | null;
	Conf: string;
	DisableCatalogRelease: boolean;
	Disabled: boolean;
	DiscountPriceGems: number;
	Features: string;
	IconOverride: string | null;
	LastChance: boolean;
	MasterSkin: string | null;
	MaterialsFile: string | null;
	Name: string;
	// Couldn't find any use of this
	NotInCatalogTID: null;
	ObtainType: number;
	ObtainTypeCN: number;
	OutlineShader: null;
	PackOfferAnimOverride: string | null;
	PetSkin: string | null;
	PetSkin2: string | null;
	PriceBling: number | null;
	PriceClubCoins: number | null;
	PriceCoins: number | null;
	PriceGems: number | null;
	PriceStarPoints: number | null;
	Rarity: string | null;
	RedSpecular: string;
	RedTexture: string;
	ShopTID: string | null;
	SkinGroupId: number;
	TID: string | null;
	id: number;
}
