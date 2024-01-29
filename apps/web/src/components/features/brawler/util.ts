export function getNameConversions<T extends Record<string, string>>(
	conversions: T,
	stats: Record<string, unknown>
) {
	return Object.fromEntries(
		Object.entries(stats).map(([key, value]) => [conversions[key as keyof typeof conversions] ?? key, value])
	);
}

export const STAT_NAME_CONVERSIONS = {
	attackrange: "Attack Range",
	attacksupercharge: "Super Charge Per Hit",
	attackspeed: "Attack Speed",
	attackwidth: "Attack Width",
	attackspread: "Attack Spread",
	attackbullets: "Projectiles Per Attack",
	reload: "Reload Speed",

	superwidth: "Width",
	superrange: "Range",
	supersupercharge: "Super Charge",
	superspeed: "Speed",
	superminionrange: "Minion Range",
	superminion: "Minion",
	superreload: "Reload Speed",
	supermovementspeed: "Movement Speed",
	superduration: "Super Duration",
};
