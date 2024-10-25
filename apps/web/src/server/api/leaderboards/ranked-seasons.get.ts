import type { PowerLeagueSeason } from "@brawltracker/brawl-stars-api";

const MIN_SEASON_ID = 101;

/**
 * As of Jul 11th, this will be auto-updated in KV
 */
const CURRENT_SEASON = 124;

function fixSeasons(seasons: PowerLeagueSeason<Date>[]) {
	return seasons.map((s) => ({
		id: Number.parseInt(s.id, 10) - 100,
		startTime: new Date(s.startTime),
		endTime: new Date(s.endTime),
	}));
}

export default cachedEventHandler(
	async () => {
		const api = useBrawlStarsApi();
		const storage = useStorage("cache");

		if (!(await storage.hasItem("season"))) {
			await storage.setItem("season", CURRENT_SEASON);
		}

		const seasons = await api.rankings.powerLeague.getSeasons("global");
		const currentSeason = await storage.getItem<number>("season");

		if (!currentSeason) {
			throw createError({
				statusCode: 500,
				statusMessage: "Failed to get current season",
			});
		}

		// seasons from the current season to 101
		const rankedSeasons = seasons.filter(
			(season) => Number.parseInt(season.id, 10) >= MIN_SEASON_ID && Number.parseInt(season.id, 10) <= currentSeason
		);
		// check if the season after the current is available
		const nextSeason = currentSeason + 1;
		const nextSeasonRankings = await api.rankings.powerLeague.getSeasonRankings("global", nextSeason);
		if (nextSeasonRankings.length === 0) {
			// then the next season is not available, so just return the ranked seasons
			return fixSeasons(rankedSeasons);
		}

		// otherwise, return the ranked seasons AND the next season
		const nextSeasonData = rankedSeasons[nextSeason];

		// also set the current season to the next season
		await storage.setItem("season", nextSeason);
		return fixSeasons([
			...rankedSeasons,
			{
				id: nextSeasonData.id,
				startTime: nextSeasonData.startTime,
				endTime: nextSeasonData.endTime,
			},
		]);
	},
	{
		maxAge: 60 * 60 * 24, // 24 hours
	}
);
