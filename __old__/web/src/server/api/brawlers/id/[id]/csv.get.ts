export default eventHandler(async (event) => {
	const id = event.context.params!.id!;
	const { brawlers, brawlerSkills } = await getCsvBrawlers();
	const brawler = Object.values(brawlers).find((b) => b.id === Number.parseInt(id, 10))!;

	if (!brawler) {
		return event.respondWith(new Response(`Brawler Not found: ${id}`, { status: 404 }));
	}

	const [attackKey] = [(brawler as any).WeaponSkill, (brawler as any).UltiSkill];

	return {
		csv: brawler,
		attack: brawlerSkills[attackKey],
	};
});
