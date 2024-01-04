export default cachedEventHandler(async (event) => {
	const id = event.context.params!.id!;
	const { brawlers, brawlerSkills } = await getCsvBrawlers();
	const brawler = Object.values(brawlers).find((b) => b.id === Number.parseInt(id, 10))!;

	if (!brawler) {
		return event.respondWith(new Response(`Brawler Not found: ${id}`, { status: 404 }));
	}

	const unresolvedName = (brawler as any).Name as string;
	const brawlerName = unresolvedName === "HookDude" ? "Hook" : unresolvedName;
	const brawlerSkillsKey = Object.keys(brawlerSkills).find((b) => b.includes(brawlerName));

	return {
		csv: brawler,
		skills: brawlerSkills[brawlerSkillsKey!],
	};
});
