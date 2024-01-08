export type Level = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;

export function resolveBrawlerName(brawlerName: string) {
	// eslint-disable-next-line unicorn/prefer-string-replace-all
	return brawlerName.toLowerCase().replace(/ +/g, "_").replace(".", "_");
}

export function calculateBrawlerLevelStat(base: number, level: Level) {
	return Math.round(base * (1 + (level - 1) * 0.1));
}

export function getCalculatedBrawlerStats(base: number) {
	return Array.from({ length: 11 })
		.fill(0)
		.map((_, index) => calculateBrawlerLevelStat(base, index as Level));
}

export function determineSpeed(speed: number) {
	if (speed <= 580) return "Very Slow";
	if (speed <= 650) return "Slow";
	if (speed <= 720) return "Normal";
	if (speed <= 770) return "Fast";
	return "Very Fast";
}
