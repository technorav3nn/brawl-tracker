import type { $Fetch } from "ofetch";
import type { RankingsPlayer } from "../../types/players";
import type { CountryCodes } from "../../types/rankings";

export class BrawlerRankingsEndpoint {
	public constructor(private readonly $fetch: $Fetch) {
		this.$fetch = $fetch;
	}

	public async getBrawlersRanking(countryCode: CountryCodes, brawlerId: string) {
		return this.$fetch<RankingsPlayer[]>(`/rankings/${countryCode}/brawlers/${brawlerId}`);
	}
}
