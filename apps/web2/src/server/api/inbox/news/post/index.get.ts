import { load } from "cheerio";
import { destr } from "destr";
import type { ScrapedBlogPostData } from "$lib/types/inbox/blog-post";

const BRAWL_STARS_BLOG_BASE_URL = "https://supercell.com/en/games/brawlstars/blog";

export default cachedEventHandler(
	async (event) => {
		const supercellBlogId = getQuery(event).scbid;

		if (!supercellBlogId) throw createError({ status: 500, message: "No id given" });

		const url = `${BRAWL_STARS_BLOG_BASE_URL}/${supercellBlogId}/`;

		const html = await $fetch<string>(url, { parseResponse: (t) => t });
		const $ = load(html!);

		const articleHtml = $(".article_articleLink__j5rH1").html();
		const articleInfo = destr<ScrapedBlogPostData>($("#__NEXT_DATA__").text());

		delete (articleInfo.props.pageProps as any).bodyCollection;
		delete (articleInfo.props.pageProps as any).openGraph;
		delete (articleInfo.props.pageProps as any).openGraph;

		return { html: articleHtml, ...articleInfo };
	},
	{
		maxAge: 60 * 12,
		swr: true,
		getKey: (e) => `brawl-stars-blog-data-${getQuery(e).scbid}`,
	}
);
