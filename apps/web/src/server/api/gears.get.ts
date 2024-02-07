import { getAllGears } from "@brawltracker/cdn";

export default cachedEventHandler(async () => getAllGears(), {
	swr: true,
	maxAge: 60 * 60 * 24,
});
