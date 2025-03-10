export interface Background {
	name: string;
	default?: boolean;
	hasColorModeVariants?: boolean;
	fileFormat: "jpg" | "png" | "webp";
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
		fileFormat: "png",
	},
	{
		name: "carnaval-bg",
		fileFormat: "png",
	},
	{
		name: "cyberbrawl-bg",
		fileFormat: "png",
	},
	{
		name: "golden-week-bg",
		fileFormat: "png",
	},
];
