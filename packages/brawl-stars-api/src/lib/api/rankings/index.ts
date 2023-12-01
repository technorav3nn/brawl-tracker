import type { $Fetch } from "ofetch";
import { BrawlerRankingsEndpoint } from "./brawlers";
import { ClubRankingsEndpoint } from "./clubs";
import { PlayerRankingsEndpoint } from "./players";
import { PowerLeagueRankingsEndpoint } from "./power-league";

export class RankingsApi {
	public readonly powerLeague: PowerLeagueRankingsEndpoint;
	public readonly brawlers: BrawlerRankingsEndpoint;
	public readonly clubs: ClubRankingsEndpoint;
	public readonly players: PlayerRankingsEndpoint;

	public constructor($fetch: $Fetch) {
		this.powerLeague = new PowerLeagueRankingsEndpoint($fetch);
		this.brawlers = new BrawlerRankingsEndpoint($fetch);
		this.clubs = new ClubRankingsEndpoint($fetch);
		this.players = new PlayerRankingsEndpoint($fetch);
	}
}
