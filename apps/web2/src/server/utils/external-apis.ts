import { brawlApi } from "@brawltracker/brawl-api";
import { singleton } from "./common";

const brawlApiSingleton = singleton("brawl-api-client", brawlApi)!;

export function useBrawlApi() {
	return brawlApiSingleton;
}
