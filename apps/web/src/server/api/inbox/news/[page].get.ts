import { load } from "cheerio";
import destr from "destr";
import type { ScrapedBlogListData } from "$lib/types/inbox/blog-list";

const BRAWL_STARS_BLOG_BASE_URL = "https://supercell.com/en/games/brawlstars/blog";

function getPage(page: number) {
	if (page === 1) return BRAWL_STARS_BLOG_BASE_URL;
	return `${BRAWL_STARS_BLOG_BASE_URL}/page/${page}/`;
}

export default cachedEventHandler(
	async (event) => {
		const page = getRouterParam(event, "page");
		if (!page) throw createError({ status: 500, statusMessage: "No page given" });
		const html = await $fetch<string>(getPage(Number(page)), { parseResponse: (t) => t });
		const $ = load(html!);

		const data = $("#__NEXT_DATA__").text();
		return destr<ScrapedBlogListData>(data);
	},
	{
		maxAge: 60 * 12,
		swr: true,
		getKey: (e) => `brawl-stars-blog-data-${getRouterParam(e, "page")}`,
	}
);
