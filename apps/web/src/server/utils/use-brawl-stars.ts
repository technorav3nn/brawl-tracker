import { brawlApi } from "@brawltracker/brawlify-api";
import { Client } from "brawlstats";
import { singleton } from "$lib/util/common";

const brawlStarsApiClient = singleton(
	"brawl-stars-api-client",
	new Client({
		token: useRuntimeConfig().brawlStarsApiToken,
	})
)!;

const brawlApiClient = singleton("brawlify-api-client", brawlApi)!;

export function useBrawlStarsApi() {
	return brawlStarsApiClient;
}

export function useBrawlifyApi() {
	return brawlApiClient;
}
