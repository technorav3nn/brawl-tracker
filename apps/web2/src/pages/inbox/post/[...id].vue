<script setup lang="ts">
import type { TocLink } from "@nuxt/content";
import type { PageLink } from "@nuxt/ui-pro/types";
import { parseFromString } from "dom-parser";
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

const doc = parseFromString(post.value!.html!);

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

const tocs = computed<(TocLink | null)[]>(() => {
	// find all h3 with id's
	// eslint-disable-next-line unicorn/prefer-query-selector
	const headings = doc.getElementsByTagName("h3");
	if (!headings) return [];
	return headings.map((heading) => {
		const tagId = cleanTocTag(heading.getAttribute("id"));
		const title = cleanTocTag(heading.textContent);

		if (!title) return null;

		return { depth: 0, id: tagId, text: title } satisfies TocLink;
	});
});

const links: PageLink[] = [
	{
		label: "Share",
		icon: "i-heroicons-share",
		click: () => {
			toast.add({ title: "Link has been copied to your clipboard!" });
			// eslint-disable-next-line n/prefer-global/url
			const url = new URL(window.location.href);
			url.hash = "";
			navigator.clipboard.writeText(url.toString());
		},
	},
	{
		label: "View Source",
		rel: "noopener noreferrer",
		target: "_blank",
		to: `https://supercell.com/en/games/brawlstars/blog/${supercellBlogId}`,
		icon: "i-heroicons-newspaper",
	},
];
</script>

<template>
	<UContainer v-if="post && postProps">
		<UPage>
			<UPageHeader :title="postProps.title" :ui="{ headline: 'flex flex-col gap-y-8 items-start' }">
				<template #headline>
					<UBreadcrumb
						:links="[
							{
								label: 'Inbox News',
								icon: 'i-heroicons-newspaper',
								to: '/inbox',
							},
							{ label: postProps!.title },
						]"
					/>
					<NuxtImg
						v-if="postProps.hero"
						:src="postProps.hero"
						:alt="postProps.title"
						:width="850"
						:height="300"
						class="rounded"
					/>
					<div class="flex items-center space-x-2">
						<span>{{ category }}</span>
						<span class="text-gray-500 dark:text-gray-400">
							&middot;&nbsp;&nbsp;
							<time>{{ new Date(postProps!.publishDate).toDateString() }}</time>
						</span>
						<span class="text-gray-500 dark:text-gray-400"
							>&middot;&nbsp;&nbsp;{{ timeToRead }} min read</span
						>
					</div>
				</template>
			</UPageHeader>

			<UPage>
				<UPageBody prose>
					<!-- eslint-disable-next-line vue/no-v-html -->
					<article v-html="post.html" />
				</UPageBody>
				<template #right>
					<UContentToc :links="tocs">
						<template #bottom>
							<div class="hidden lg:block space-y-6">
								<UDivider v-if="tocs.length !== 0" />
								<UPageLinks title="More" :links="links" />
							</div>
						</template>
					</UContentToc>
				</template>
			</UPage>
		</UPage>
	</UContainer>
</template>
