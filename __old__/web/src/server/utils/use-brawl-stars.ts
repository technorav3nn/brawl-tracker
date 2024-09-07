import { brawlApi } from "@brawltracker/brawl-api";
import { BrawlStarsClient } from "@brawltracker/brawl-stars-api";
import { singleton } from "$lib/util/common";

const brawlStarsApiClient = singleton(
	"brawl-stars-api-client",
	new BrawlStarsClient(useRuntimeConfig().brawlStarsApiToken)
)!;

const brawlApiClient = singleton("brawl-api-client", brawlApi)!;

export function useBrawlStarsApi() {
	return brawlStarsApiClient;
}

export function useBrawlifyApi() {
	return brawlApiClient;
}
