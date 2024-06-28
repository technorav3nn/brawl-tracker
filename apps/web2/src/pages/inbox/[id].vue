<script setup lang="ts">
import type { TocLink } from "@nuxt/content";
import { load } from "cheerio";

const route = useRoute("inbox-id");
const id = route.params.id;
const supercellBlogId = route.query.scbid as string;

const { data: post } = await useFetch("/api/inbox/news/post", {
	params: { scbid: supercellBlogId },
});

if (!post) {
	throw createError({ statusCode: 404, message: "Post Not Found", fatal: true });
}

if (!supercellBlogId || !id) {
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
const tocs = computed<(TocLink | null)[]>(() => {
	// find all h3 with id's
	const headings = $("h3[id]").toArray();
	if (!headings) return [];
	return headings.map((heading) => {
		const tag = $(heading);
		const tagId = tag.attr("id")!;
		const title = tag.text();

		return { depth: 0, id: tagId, text: title } satisfies TocLink;
	});
});

console.log(tocs.value);
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
						<span> Brawl Stars </span>
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
					<UContentToc v-if="tocs" :links="tocs">
						<template #bottom>
							<div class="hidden lg:block space-y-6">
								<UDivider type="dashed" />
							</div>
						</template>
					</UContentToc>
				</template>
			</UPage>
		</UPage>
	</UContainer>
</template>
