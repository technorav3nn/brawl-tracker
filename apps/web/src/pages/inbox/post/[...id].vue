<script setup lang="ts">
/* eslint-disable vue/no-v-html */
import type { TocLink } from "@nuxt/content";
import type { PageLink } from "@nuxt/ui-pro";
import { load } from "cheerio";
import { capitalizeLetters, kebabCaseToNormalCase } from "$lib/utils/common";

const route = useRoute("inbox-post-id");
const toast = useToast();

const id = route.params.id as string[];
const supercellBlogId = id.join("/");

const category = capitalizeLetters(kebabCaseToNormalCase(supercellBlogId.split("/")[0]));

const { data: post, status } = await useFetch("/api/inbox/news/post", {
	params: { scbid: supercellBlogId },
});

if (status.value === "error" || !id || !post.value?.html) {
	throw createError({ statusCode: 404, message: "Post Not Found", fatal: true });
}

const $ = load(post.value!.html!);

const postProps = computed(() => post.value?.props.pageProps);
const timeToRead = computed(() => {
	const htmlLength = post.value?.html?.length;
	const wordsPerMinute = 500;
	if (!htmlLength) return 0;
	return Math.ceil(htmlLength / wordsPerMinute);
});

function cleanTocTag(heading: string) {
	return heading.replaceAll("&amp;", "&");
}

const tocs = computed<TocLink[]>(() => {
	const headings = $("h3, h2");
	if (!headings) return [];

	return headings
		.map((_, el) => {
			const title = cleanTocTag($(el).text());
			const tagId = cleanTocTag($(el).attr("id") ?? title.toLowerCase().replaceAll(/\s/g, "-"));

			console.log($(el).parent().html());

			$(el).parent().attr("id", tagId);

			console.log(el);

			return { depth: 0, id: tagId, text: title } satisfies TocLink;
		})
		.get();
});

const links: (PageLink & { onSelect?(): any })[] = [
	{
		label: "Share",
		icon: "i-heroicons-share",
		onSelect: async () => {
			// eslint-disable-next-line n/prefer-global/url
			const url = new URL(window.location.href);
			url.hash = "";
			if (navigator.canShare()) {
				await navigator.share({
					url: url.toString(),
				});
				return;
			}

			await navigator.clipboard.writeText(url.toString());
			toast.add({ title: "Link has been copied to your clipboard!" });
		},
	},
	{
		label: "View Source",
		rel: "noopener noreferrer",
		target: "_blank",
		to: `https://supercell.com/en/games/brawlstars/blog/${supercellBlogId}`,
		icon: "i-heroicons-newspaper",
	},
	{
		label: "Open In Brawl Stars",
		icon: "i-heroicons-inbox",
		to: "brawlstars://news",
		target: "_blank",
	},
];

const html = computed(() => {
	const images = $("img");
	images.each((_, el) => {
		// make them smaller if they are too big
		const $el = $(el);
		const width = Number($el.attr("width") ?? "0");
		const height = Number($el.attr("height") ?? "0");

		$el.attr("width", (width / 2).toString());
		$el.attr("height", (height / 2).toString());

		// make them lazy load
		$el.attr("loading", "lazy");
	});

	const headings = $("h3, h2");
	if (!headings) return $.html();

	headings.each((_, el) => {
		const title = $(el).text();
		const tagId = title.toLowerCase().replaceAll(/\s/g, "-");
		$(el).attr("id", tagId);
	});

	$("[data-test-id='tagline']").remove();

	return $.html();
});
</script>

<template>
	<NuxtImg
		v-if="postProps"
		:src="postProps.hero ?? '/backgrounds/yellow-bg-dark.webp'"
		:alt="postProps.title"
		width="2000"
		height="400"
		loading="eager"
		preload
	/>
	<UContainer v-if="post && postProps">
		<UPage>
			<UPageHeader :title="postProps.title" :ui="{ headline: 'flex flex-col gap-y-8 items-start' }">
				<template #headline>
					<UBreadcrumb
						class="w-full"
						:items="[
							{
								label: 'Inbox News',
								icon: 'i-heroicons-newspaper',
								to: '/inbox',
							},
							{ label: postProps!.title },
						]"
					/>

					<div class="flex items-center space-x-2">
						<span>{{ category }}</span>
						<span class="text-gray-500 dark:text-gray-400">
							&middot;&nbsp;&nbsp;
							<time>{{ new Date(postProps!.publishDate).toDateString() }}</time>
						</span>
						<span class="text-gray-500 dark:text-gray-400">&middot;&nbsp;&nbsp;{{ timeToRead }} min read</span>
					</div>
				</template>
			</UPageHeader>

			<UPage>
				<UPageBody>
					<article class="prose max-w-full dark:prose-invert" v-html="html" />
				</UPageBody>
				<template #right>
					<UContentToc :links="tocs">
						<template #bottom>
							<div class="hidden space-y-6 lg:block">
								<USeparator v-if="tocs.length !== 0" />
								<UPageLinks title="More" :links="links" />
							</div>
						</template>
					</UContentToc>
				</template>
			</UPage>
		</UPage>
	</UContainer>
</template>
