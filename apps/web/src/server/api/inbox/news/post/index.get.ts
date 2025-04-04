import { load } from "cheerio";
import { destr } from "destr";
import type { ScrapedBlogPostData } from "$lib/types/inbox/blog-post";

const BRAWL_STARS_BLOG_BASE_URL = "https://supercell.com/en/games/brawlstars/blog";

export default eventHandler(async (event) => {
	const supercellBlogId = getQuery(event).scbid;

	if (!supercellBlogId) throw createError({ status: 500, statusMessage: "No id given" });

	const url = `${BRAWL_STARS_BLOG_BASE_URL}/${supercellBlogId}/`;

	const html = await $fetch<string>(url, { parseResponse: (t) => t });
	const $ = load(html!);

	function getRootHtml() {
		const rootChild = $("div[data-test-id='tagline']");
		const root = rootChild.parent();
		return root.html();
	}

	const articleHtml = getRootHtml();
	const articleInfo = destr<ScrapedBlogPostData>($("#__NEXT_DATA__").text());

	delete (articleInfo.props.pageProps as any).bodyCollection;
	delete (articleInfo.props.pageProps as any).openGraph;

	return { html: articleHtml, ...articleInfo };
});
