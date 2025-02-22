import type { CountryCodes } from "@brawltracker/brawl-stars-api";

/* eslint-disable @typescript-eslint/padding-line-between-statements */
export default defineEventHandler((event) => {
	const query = getQuery<{
		location?: string;
		type?: "brawlers" | "clubs" | "players";
		brawler?: string;
	}>(event);
	const [location, type, brawler] = [query.location as CountryCodes | undefined, query.type, query.brawler];
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
		default: {
			throw createError({
				statusCode: 400,
				statusMessage: `Invalid type: ${type}`,
			});
		}
	}
});
