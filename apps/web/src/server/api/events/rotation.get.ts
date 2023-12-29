import { getBrawlerImages } from "$server/utils/get-brawler-images";

// cachedEventHandler has some issues so we use a cachedFunction and connect it to the eventHandler
const handler = cachedFunction(
	async () => {
		const api = useBrawlifyApi();
		const events = await api.events.getEventRotation();
		// const plEvents = null;
		return {
			...events,
			images: await getBrawlerImages(),
		};
	},
	{ maxAge: 10 }
);

export default eventHandler(handler);
