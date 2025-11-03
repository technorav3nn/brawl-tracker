import type { SitemapUrlInput } from "@nuxtjs/sitemap";

export default defineSitemapEventHandler(async () => {
	const brawlers = (await useBrawlApi().brawlers.getAllBrawlers()).list;

	const siteMapBrawlers: SitemapUrlInput[] = brawlers.map((brawler) => ({
		loc: `/brawlers/${brawler.id}`,
		lastmod: new Date(),
		changefreq: "daily",
		priority: 0.8,
		images: [],
	}));

	return siteMapBrawlers;
});
