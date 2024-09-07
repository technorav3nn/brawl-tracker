interface Title {
	id: number;
	Name: string;
	TitleTID: string;
	Gradient: string;
}

export default defineCachedEventHandler(
	async () => {
		const titles = $fetch<Record<string, Title>>("https://api.brawlapi.com/game/csv_logic/player_titles");
		const texts = $fetch("https://api.brawlapi.com/game/localization/texts");
	},
	{
		maxAge: 60 * 60 * 24, // 24 hours
		swr: true,
	}
);
