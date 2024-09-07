import type { CountryCodes } from "@brawltracker/brawl-stars-api";

/* eslint-disable @typescript-eslint/padding-line-between-statements */
export default defineEventHandler((event) => {
	const query = getQuery<{
		location?: string;
		type?: "brawlers" | "clubs" | "players" | "ranked";
		brawler?: string;
		seasonId?: string;
	}>(event);
	const [location, type, brawler, seasonId] = [
		query.location as CountryCodes | undefined,
		query.type,
		query.brawler,
		query.seasonId,
	];
	if (!location || !type) {
		throw createError({
			statusCode: 400,
			statusMessage: `Missing required query params`,
		});
	}

	const api = useBrawlStarsApi();

	switch (type) {
		case "brawlers": {
			return api.rankings.brawlers.getBrawlersRanking(location!, brawler!);
		}
		case "clubs": {
			return api.rankings.clubs.getClubsRanking(location!);
		}
		case "players": {
			return api.rankings.players.getPlayersRanking(location!);
		}
		case "ranked": {
			return api.rankings.powerLeague.getSeasonRankings(location!, Number.parseInt(seasonId!, 10));
		}
		default: {
			throw createError({
				statusCode: 400,
				statusMessage: `Invalid type: ${type}`,
			});
		}
	}
});
