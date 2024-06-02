import { $fetch } from "ofetch";
import type {
	ApiProfileResponse,
	ApiUnresolvedProfileStats,
	ResolvedProfileStats,
} from "./lib/types/profile";

const BASE_URL = "https://api.hpdevfox.ru";

export async function getPlayerProfile(tag: string) {
	const unresolvedData = await $fetch<ApiProfileResponse<ApiUnresolvedProfileStats>>(
		`${BASE_URL}/profile/${tag}`
	);
	(unresolvedData.Stats as unknown as ApiProfileResponse<ResolvedProfileStats>["Stats"]) = resolveStats(
		unresolvedData.Stats
	);
	return unresolvedData as unknown as ApiProfileResponse<ResolvedProfileStats>;
}

function resolveStats(stats: ApiUnresolvedProfileStats): ResolvedProfileStats {
	return {
		"3v3Wins": stats[1],
		duoWins: stats[11],
		soloWins: stats[8],
		trophies: stats[3],
		bossFightMaxDifficulty: stats[12],
		roboRumble: stats[9],
		bigGameTime: stats[14],
		cityRampageMaxDifficulty: stats[16],
		challengeWins: stats[15],
		brawlersOwned: stats[5],
		fame: stats[20],
		clubLeague: stats[19],
		currentRankedRank: stats[23],
		highestRankedRank: stats[22],
		experiencePoints: stats[2],
		highestTrophies: stats[4],
		legacyExperiencePoints: stats[21],
		powerPlayHighest: stats[13],
		powerLeagueSolo: stats[18],
		powerLeagueTeam: stats[17],
	};
}
