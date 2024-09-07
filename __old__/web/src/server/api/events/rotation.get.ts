import { getBrawlerImages } from "$server/utils/get-brawler-images";

export default cachedEventHandler(
	async () => {
		const api = useBrawlifyApi();
		const events = await api.events.getEventRotation();
		const leagueEvents = await api.league.getPowerLeagueRotation();

		return {
			...events,
			images: await getBrawlerImages(),
			league: leagueEvents,
		};
	},
	{
		maxAge: 10 * 60,
		swr: true,
	}
);
