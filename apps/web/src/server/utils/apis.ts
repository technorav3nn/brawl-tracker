import { brawlApi } from "@brawltracker/brawl-api";
import { BrawlStarsClient } from "@brawltracker/brawl-stars-api";
import { singleton } from "./common";

const brawlApiSingleton = singleton("brawl-api-client", brawlApi)!;
const brawlStarsApiSingleton = singleton("brawl-stars-api-client", new BrawlStarsClient(useRuntimeConfig().brawlStarsApiToken));

export function useBrawlApi() {
	return brawlApiSingleton;
}

export function useBrawlStarsApi() {
	return brawlStarsApiSingleton!;
}
