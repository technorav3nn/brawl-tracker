import { getPlayerProfile } from "@brawltracker/gene-brawl-api";
import { typesafeOmit } from "$lib/utils/common";

export default defineEventHandler(async (event) => {
	if (!event.context.params!.tag) {
		throw createError({
			statusCode: 400,
			statusMessage: 'Missing required parameter "tag"',
		});
	}

	setHeader(event, "Cache-Control", "public, max-age=180, stale-while-revalidate=60, stale-if-error=900");

	const tag = event.context.params!.tag.replaceAll("%23", "");

	const api = useBrawlStarsApi();
	const player = await api.players.getPlayer(tag).catch((error) => {
		console.error(error);
		throw createError({
			statusCode: 500,
			statusMessage: "Internal server error",
		});
	});

	if (!player) {
		throw createError({
			statusCode: 404,
			message: "Player not found",
		});
	}

	let meowApiPlayer = null;
	const meowApiData = await getPlayerProfile(tag);

	if (meowApiData.state === 0 && meowApiData.response !== null) {
		meowApiPlayer = meowApiData.response;
	}

	if (!meowApiPlayer) {
		throw createError({
			statusCode: 404,
			message: "Player not found",
		});
	}

	// eslint-disable-next-line sonarjs/prefer-immediate-return
	const response = {
		...typesafeOmit(meowApiPlayer.Stats, [
			"3v3Wins",
			"expPoints",
			"trophies",
			"highestTrophies",
			"brawlersOwned",
			"soloWins",
			"duoWins",
			"roboRumbleMaxDifficulty",
			"bossFightMaxDifficulty",
		]),
		maxWinStreak: meowApiPlayer.WinStreak,
		favoriteBrawler: {
			id: meowApiPlayer.FavouriteBrawler,
			skinId: meowApiPlayer.FavouriteSkin,
		},
	};

	return response;
});
