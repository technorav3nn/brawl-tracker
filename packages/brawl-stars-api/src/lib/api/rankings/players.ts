import type { $Fetch } from "ofetch";
import type { RankingsPlayer } from "../../types/players";
import type { CountryCodes } from "../../types/rankings";

export class PlayerRankingsEndpoint {
	public constructor(private readonly $fetch: $Fetch) {
		this.$fetch = $fetch;
	}

	public async getPlayersRanking(countryCode: CountryCodes) {
		return this.$fetch<RankingsPlayer[]>(`/rankings/${countryCode}/players`);
	}
}
