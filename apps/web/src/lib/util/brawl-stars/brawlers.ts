type Level = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;

const BRAWLER_LEVEL_DIVISOR = 10;
const MAX_LEVEL = 11;
const SPACES_REGEX = / +/g;

export function resolveBrawlerName(brawlerName: string) {
	// eslint-disable-next-line unicorn/prefer-string-replace-all
	return brawlerName.toLowerCase().replace(SPACES_REGEX, "_").replace(".", "_");
}

export function calculateBrawlerLevelStat(base: number, level: Level) {
	return base + level * (base / BRAWLER_LEVEL_DIVISOR);
}

export function getCalculatedBrawlerStats(base: number) {
	return Array.from({ length: MAX_LEVEL })
		.fill(0)
		.map((_, index) => calculateBrawlerLevelStat(base, index as Level));
}
