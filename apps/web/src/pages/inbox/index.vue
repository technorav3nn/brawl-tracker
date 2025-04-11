<script setup lang="ts">
import type { UBlogPost } from "#build/components";
import type { Article } from "$lib/types/inbox/blog-list";
import { kebabCaseToNormalCase, capitalizeLetters } from "$lib/utils/common";

type UBlogPostProps = InstanceType<typeof UBlogPost>["$props"];

const route = useRoute("inbox");
const page = ref(Number(route.query.page ?? 1));

const { data: news } = await useFetch(() => `/api/inbox/news/${page.value}`, {
	transform: (e) => e.props.pageProps,
	watch: [page],
});

function scrollToTop() {
	window.scrollTo({ top: 0, behavior: "smooth" });
}

function getPostIdFromUrl(url: string) {
	return url.split("/").slice(-2).join("/");
}

function getOtherInfoFromUrl(url: string) {
	const postId = getPostIdFromUrl(url);
	return {
		// community/thumbs-up-for-brawl-community-event -> community
		category: postId.split("/")[0],
		href: `/inbox/post/${postId}`,
	};
}

function getPropsForPost(post: Article, index: number): UBlogPostProps {
	const { category, href } = getOtherInfoFromUrl(post.linkUrl);
	return {
		title: post.title,
		date: new Date(post.publishDate).toDateString(),
		badge: { label: capitalizeLetters(kebabCaseToNormalCase(category!)) },
		image: {
			src: post.thumbnail.imgUrl,
			alt: post.title,
			loading: index <= 3 ? "eager" : "lazy",
		},
		orientation: "vertical",
		to: href,
	};
}
</script>

<template>
	<UContainer v-if="news">
		<UPageHeader
			:ui="{ wrapper: 'pt-10', root: 'border-0 pt-8 pb-4' }"
			title="Brawl News"
			description="The latest relevant news from your Inbox in Brawl Stars, right here!"
			:links="[
				{
					label: 'View RSS',
					icon: 'i-heroicons-rss-16-solid',
					to: 'https://github.com/skrwo/supercell-inbox-rss/tree/main/rss',
					size: 'lg',
					target: '_blank',
					color: 'primary',
					variant: 'solid',
				},
				{
					label: 'Visit In-game Inbox',
					icon: 'i-heroicons-envelope-open-16-solid',
					to: 'https://brawlstars.inbox.supercell.com/',
					color: 'neutral',
					variant: 'subtle',
					size: 'lg',
					target: '_blank',
				},
			]"
		>
		</UPageHeader>
		<UPageBody>
			<UBlogPosts class="gap-x-7 gap-y-3.5 lg:gap-y-6">
				<UBlogPost
					v-for="(post, index) in news!.articles"
					:key="post.title"
					variant="naked"
					v-bind="getPropsForPost(post as Article, index)"
					:ui="{ body: 'p-0 sm:p-0 py-4!' }"
				/>
			</UBlogPosts>

			<div class="mt-8 flex justify-center">
				<UPagination
					v-model:page="page"
					:total="news?.pageNumbers.length"
					:itemsPerPage="1"
					showEdges
					:to="(p: number) => ({ query: { page: p } })"
					@update:page="scrollToTop"
				/>
			</div>

			<div class="mt-16 flex flex-1 flex-col items-center justify-center">
				<UIcon name="i-heroicons-envelope-open-20-solid" class="mx-auto mb-4 h-6 w-6 text-gray-400 dark:text-gray-500" />
				<p class="mb-4 text-center text-sm text-gray-900 dark:text-white">No more posts to show</p>
				<UButton icon="i-heroicons-arrow-up" size="sm" @click="scrollToTop"> Scroll To Top </UButton>
			</div>
		</UPageBody>
	</UContainer>
</template>
