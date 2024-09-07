import colors from "tailwindcss/colors";

export const GAME_MODE_COLORS: Record<string, string> = {
	"Solo-Showdown": colors.green[500],
	"Duo-Showdown": colors.green[500],
	"Gem-Grab": colors.purple[500],
	"Pumpkin-Plunder": colors.orange[500],
	"Brawl-Ball": colors.blue[500],
	Bounty: colors.yellow[500],
	Heist: colors.fuchsia[500],
	"Hot-Zone": colors.red[500],
};

export const RARITY_COLORS: Record<string, string> = {
	Legendary: colors.yellow[400],
	Mythic: colors.red[400],
	Epic: colors.purple[400],
	"Super Rare": colors.blue[400],
	Rare: colors.green[400],
	Common: colors.gray[400],
};
