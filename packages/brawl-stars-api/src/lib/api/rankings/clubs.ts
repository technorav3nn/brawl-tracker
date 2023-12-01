import type { $Fetch } from "ofetch";
import type { RankingClub } from "../../types/clubs";
import type { CountryCodes } from "../../types/rankings";

export class ClubRankingsEndpoint {
	public constructor(private readonly $fetch: $Fetch) {
		this.$fetch = $fetch;
	}

	public async getClubsRanking(countryCode: CountryCodes) {
		return this.$fetch<RankingClub[]>(`/rankings/${countryCode}/clubs`);
	}
}
