import { $fetch, FetchError } from "ofetch";
import type { ApiAllianceResponse } from "./lib/types/alliance";
import type { ApiProfileResponse, ApiUnresolvedProfileStats } from "./lib/types/profile";
import type { ShopResponse } from "./lib/types/shop";

export * from "./lib/types/profile";
export * from "./lib/types/shop";
export * from "./lib/types/alliance";

const BASE_URL = "https://api.hpdevfox.ru";

export async function getShop() {
	return $fetch<ShopResponse>(`${BASE_URL}/shop`);
}

export async function getPlayerProfile(tag: string) {
	const data = await $fetch<ApiProfileResponse<ApiUnresolvedProfileStats>>(`${BASE_URL}/profile/${tag}`);
	if (data?.detail === 0) {
		throw new FetchError("Invalid player tag");
	}

	if (!data.response) {
		return data as unknown as ApiProfileResponse<ReturnType<typeof resolveStats>>;
	}

	(data.response.Stats as unknown as ReturnType<typeof resolveStats>) = resolveStats(data.response.Stats);
	return data as unknown as ApiProfileResponse<ReturnType<typeof resolveStats>>;
}

export async function getAlliance(tag: string) {
	const data = await $fetch<ApiAllianceResponse>(`${BASE_URL}/alliance/${tag}`);
	if (data?.state !== 0) {
		throw new FetchError("Invalid alliance tag");
	}

	return data.response;
}

function resolveStats(stats: ApiUnresolvedProfileStats) {
	return {
		"3v3Wins": stats[1],
		expPoints: stats[2],
		trophies: stats[3],
		highestTrophies: stats[4],
		brawlersOwned: stats[5],
		soloWins: stats[8],
		duoWins: stats[11],
		roboRumbleMaxDifficulty: stats[9],
		bossFightMaxDifficulty: stats[12],
		powerLeagueTeamHighestRank: stats[17],
		powerLeagueSoloHighestRank: stats[18],
		totalFame: stats[20],
		legacyExpPoints: stats[21],
		accountCreationDate: stats[27],
		currentRankedRank: stats[23],
		highestRankedRank: stats[22],
		currentRankedElo: stats[24],
		highestRankedElo: stats[25],
		legacyRank35s: stats[28],
		seasonHighTrophies: stats[29],
		prestige: stats[30],

		// "3v3Wins": stats[1],
		// duoWins: stats[11],
		// soloWins: stats[8],
		// trophies: stats[3],
		// bossFightMaxDifficulty: stats[12],
		// roboRumble: stats[9],
		// powerPlayHighestRank: stats[14],
		// cityRampageMaxDifficulty: stats[16],
		// challengeWins: stats[15],
		// brawlersOwned: stats[5],
		// fame: stats[20],
		// clubLeague: stats[19],
		// currentRankedRank: stats[23],
		// highestRankedRank: stats[22],
		// experiencePoints: stats[2],
		// highestTrophies: stats[4],
		// legacyExperiencePoints: stats[21],
		// powerPlayHighest: stats[13],
		// powerLeagueSolo: stats[18],
		// powerLeagueTeam: stats[17],
	};
}
