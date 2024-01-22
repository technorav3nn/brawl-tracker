export default cachedFunction(
	async () => {
		// eslint-disable-next-line sonarjs/prefer-immediate-return
		const csvBrawlers = await useBrawlifyApi().csv.getBrawlers();
		const skills = await $fetch<Record<string, BrawlerSkill>>(
			"https://api.brawlapi.com/game/csv_logic/skills"
		);
		return {
			brawlers: csvBrawlers,
			brawlerSkills: skills,
		};
	},
	{
		maxAge: 60 * 60 * 24,
		swr: true,
		name: "getBrawlerImages",
	}
);

interface BrawlerSkill {
	ActiveTime: number;
	Damage: number;
	Name: string;
	RechargeTime: number;
	Spread: number;
	id: number;
	Cooldown: number;
	MaxCharge: number;
	/**
	 * Casting range not in tiles, must convert to tiles
	 */
	CastingRange: number;
}
