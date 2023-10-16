import { Client } from "brawlstats";
import { useRuntimeConfig } from "#imports";
import { singleton } from "../lib/util/objects";

export const brawlStarsApiClient = singleton(
	"brawl-stars-api-client",
	new Client({
		token: useRuntimeConfig().brawlStarsApiToken,
	})
)!;
