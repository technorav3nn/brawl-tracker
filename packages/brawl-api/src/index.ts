import { brawlers, events, maps } from "./lib/handlers";

export { FetchError as BrawlApiFetchError } from "ofetch";

export const brawlApi = {
	brawlers,
	events,
	maps,
};

export * from "./lib/types";
