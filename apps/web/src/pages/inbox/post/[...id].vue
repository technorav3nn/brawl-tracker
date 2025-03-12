<script setup lang="ts">
/* eslint-disable vue/no-v-html */
import type { TocLink } from "@nuxt/content";
import type { PageLink } from "@nuxt/ui-pro/types";
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
	const headings = $("h3");
	if (!headings) return [];

	return headings
		.map((_, el) => {
			const title = cleanTocTag($(el).text());
			const tagId = cleanTocTag($(el).attr("id") ?? title.toLowerCase().replaceAll(/\s/g, "-"));

			$(el)
				.parent()
				.attr("id", tagId)
				.each((_, el) => void (el.tagName = "h3"));

			return { depth: 0, id: tagId, text: title } satisfies TocLink;
		})
		.get();
});

const links: PageLink[] = [
	{
		label: "Share",
		icon: "i-heroicons-share",
		click: async () => {
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
</script>

<template>
	<NuxtImg v-if="postProps" :src="postProps.hero" :alt="postProps.title" width="2000" height="400" loading="eager" preload />
	<UContainer v-if="post && postProps">
		<UPage>
			<UPageHeader :title="postProps.title" :ui="{ headline: 'flex flex-col gap-y-8 items-start' }">
				<template #headline>
					<UBreadcrumb
						class="w-full"
						:links="[
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
				<UPageBody prose>
					<article v-html="$.html()" />
				</UPageBody>
				<template #right>
					<UContentToc :links="tocs">
						<template #bottom>
							<div class="hidden lg:block space-y-6">
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
