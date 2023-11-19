import { getBrawlerImages } from "$server/utils/get-brawler-images";

// cachedEventHandler has some issues so we use a cachedFunction and connect it to the eventHandler
const handler = cachedFunction(
	async () => {
		// eslint-disable-next-line sonarjs/prefer-immediate-return
		const result = await useBrawlifyApi()?.events.getEventRotation();
		return {
			...result,
			images: await getBrawlerImages(),
		};
	},
	{ maxAge: 10 }
);

export default eventHandler(handler);
