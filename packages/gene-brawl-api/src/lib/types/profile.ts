export interface ApiProfileResponse<StatType> {
	detail?: 0;
	response: ApiProfile<StatType> | null;
	state: number;
	tag: string;
}

export interface ApiProfile<StatType> {
	AccountId: {
		High: number;
		Low: number;
	};
	BattleCard: ApiProfileBattleCard;
	/**
	 * Value is -1 if the player doesn't own the current Brawl Pass in this season,
	 * otherwise the number is the current Brawl Pass season number
	 */
	BrawlPass: number;
	FavouriteBrawler: number;
	FavouriteSkin: number;
	Heroes: ApiProfileHero[];
	Name: string;
	NameColor: number;
	ProfileIcon: number;
	Stats: StatType;
	/**
	 * Highest Win Streak by the player
	 */
	WinStreak: number;
}

export interface ApiProfileHero {
	Character: number;
	HighestTrophies: number;
	Mastery: number;
	Power: number;
	Skin: number;
	Trophies: number;
}

export interface ApiProfileBattleCard {
	Emoji: number;
	FirstIcon: number;
	SecondIcon: number;
	/**
	 * To get player title id from csv, use the following:
	 * x - 7600000 = id
	 * - where x follows the interval (7600000, 7600000 + (number of titles))
	 */
	Title: number;
}

/**
 * 1 - 3v3
 * 2 - Exp Points
 * 3 - Trophies
 * 4 - Highest Trophies
 * 5 - Brawlers Owned
 * 8 - Solo Wins
 * 9 - Robo Rumble
 * 11 - Duo Wins
 * 12 - Boss Fight
 * 13 - Power Play Highest
 * 14 - Power Play Highest Rank
 * 15 - Challange Wins
 * 16 - City Rampage
 * 17 - Power League Team
 * 18 - PL Solo
 * 19 - Club League
 * 20 - Fame
 * 21 - Legacy EXP Points value
 * 22 - Highest Ranked Rank
 * 23 - Current Ranked Rank
 */

export type ApiUnresolvedProfileStats = Record<number, number>;

export interface ResolvedProfileStats {
	"3v3Wins": number;
	bossFightMaxDifficulty: number;
	brawlersOwned: number;
	challengeWins: number;
	cityRampageMaxDifficulty: number;
	clubLeague: number;
	currentRankedRank: number;
	duoWins: number;
	experiencePoints: number;
	fame: number;
	highestRankedRank: number;
	highestTrophies: number;
	legacyExperiencePoints: number;
	powerLeagueSolo: number;
	powerLeagueTeam: number;
	powerPlayHighest: number;
	powerPlayHighestRank: number;
	roboRumble: number;
	soloWins: number;
	trophies: number;
}
