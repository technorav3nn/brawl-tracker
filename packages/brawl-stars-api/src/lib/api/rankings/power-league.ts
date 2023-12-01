import { convertApiDate } from "@brawltracker/supercell-api-utils";
import type { $Fetch } from "ofetch";
import type { RankingsPlayer } from "../../types/players";
import type { CountryCodes, PowerLeagueSeason } from "../../types/rankings";

export class PowerLeagueRankingsEndpoint {
	public constructor(private readonly $fetch: $Fetch) {
		this.$fetch = $fetch;
	}

	public async getSeasons(countryCode: CountryCodes) {
		const seasons = await this.$fetch<PowerLeagueSeason<string>[]>(
			`/rankings/${countryCode}/powerplay/seasons`
		);
		return seasons.map((season) => ({
			...season,
			endTime: convertApiDate(season.endTime),
			startTime: convertApiDate(season.startTime),
		})) as PowerLeagueSeason<Date>[];
	}

	public async getSeasonRankings(countryCode: CountryCodes, seasonId: string) {
		return this.$fetch<RankingsPlayer[]>(`/rankings/${countryCode}/powerplay/seasons/${seasonId}`);
	}
}
