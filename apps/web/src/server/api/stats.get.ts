import { setTimeout as delay } from "node:timers/promises";

export default eventHandler(async () => {
	const brawlStars = useBrawlStarsApi();
	const leaderboards = await brawlStars.leaderboards.fetch({ mode: "players", region: "global" });
	// I need to loop thru the leaderboards, and get the battlelog for each player,
	// but it cannot be too fast to avoid rate limits. So I will use a setTimeout.

	// make sure to use setTimeout
	return await Promise.all(
		leaderboards.map((player) => {
			return delay(1000).then(() => brawlStars.battlelogs.fetch(player.tag));
		})
	);
});
