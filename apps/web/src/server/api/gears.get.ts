import { getAllGears } from "@brawltracker/cdn";

export default cachedEventHandler(() => getAllGears(), {
	swr: true,
	maxAge: 60 * 60 * 24,
});
