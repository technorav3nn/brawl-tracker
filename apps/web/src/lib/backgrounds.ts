export interface Background {
	name: string;
	default?: boolean;
	hasColorModeVariants?: boolean;
	fileFormat: "jpg" | "png" | "webp";
	backgroundPosition?: string;
}

export const BACKGROUNDS: Background[] = [
	{
		name: "yellow-bg",
		fileFormat: "webp",
		default: true,
		hasColorModeVariants: true,
	},
	{
		name: "blue-bg",
		fileFormat: "jpg",
	},
	{
		name: "brawlywood-bg",
		fileFormat: "webp",
	},
	{
		name: "carnaval-bg",
		fileFormat: "webp",
	},
	{
		name: "cyberbrawl-bg",
		fileFormat: "webp",
	},
	{
		name: "golden-week-bg",
		fileFormat: "webp",
	},
	{
		name: "dark-sands-bg",
		fileFormat: "webp",
	},
	{
		name: "enchanted-woods-bg",
		fileFormat: "webp",
	},
	{
		name: "finx-bg",
		fileFormat: "webp",
	},
	{
		name: "gods-vs-monsters-bg",
		fileFormat: "webp",
	},
	{
		name: "lumi-bg",
		fileFormat: "webp",
	},
	{
		name: "mortis-mecha-bg",
		fileFormat: "webp",
		backgroundPosition: "bottom",
	},
	{
		name: "mystery-at-the-hub-bg",
		fileFormat: "webp",
	},
	{
		name: "paint-brawl-bg",
		fileFormat: "webp",
	},
	{
		name: "pirates-bg",
		fileFormat: "webp",
	},
	{
		name: "psg-bg",
		fileFormat: "webp",
	},
	{
		name: "ragnarok-bg",
		fileFormat: "webp",
	},
	{
		name: "rumble-jungle-bg",
		fileFormat: "webp",
	},
	{
		name: "stuntshow-bg",
		fileFormat: "webp",
	},
	{
		name: "swampoflove-bg",
		fileFormat: "webp",
	},
	{
		name: "uno-bg",
		fileFormat: "webp",
	},
];
