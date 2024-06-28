<script setup lang="ts">
const route = useRoute("inbox");
const page = ref(Number(route.query.page ?? 1));

const { data: news } = await useFetch(() => `/api/inbox/news/${page.value}`, {
	transform: (e) => e.props.pageProps,
	watch: [page],
});

watch(page, () => console.log(page.value));

function scrollToTop() {
	window.scrollTo({ top: 0, behavior: "smooth" });
}

function getPostIdsFromUrl(url: string) {
	// /en/games/brawlstars/blog/community/100starrdrops-community-event -> 100starrdrops-community-event
	const id = url.split("/").pop()!;
	// /en/games/brawlstars/blog/community/100starrdrops-community-event -> /community/100starrdrops-community-event
	const supercellBlogId = url.split("/").slice(-2).join("/");

	return { id, supercellBlogId };
}

function generateHref(linkUrl: string) {
	const { id, supercellBlogId } = getPostIdsFromUrl(linkUrl);
	return `/inbox/${id}?scbid=${encodeURIComponent(supercellBlogId)}`;
}
</script>

<template>
	<UContainer v-if="news">
		<UPageHero
			title="Brawl News"
			description="The latest relevant news from your Inbox in Brawl Stars, right here!"
			:links="[
				{
					label: 'View RSS',
					icon: 'i-heroicons-rss-16-solid',
					to: 'https://github.com/skrwo/supercell-inbox-rss/tree/main/rss',
					color: 'gray',
					size: 'lg',
					target: '_blank',
				},
			]"
		>
		</UPageHero>
		<UPageBody>
			<UBlogList>
				<UBlogPost
					v-for="post in news!.articles"
					:key="post.title"
					:title="post.title"
					:date="new Date(post.publishDate).toDateString()"
					:badge="{ label: post.category }"
					:image="{
						src: post.thumbnail.imgUrl,
						alt: post.title,
					}"
					orientation="vertical"
					:to="generateHref(post.linkUrl)"
				/>
			</UBlogList>

			<div class="flex justify-center mt-8">
				<UPagination
					v-model="page"
					:total="news?.pageNumbers.length"
					:pageCount="1"
					:to="(p: number) => ({ query: { page: p } })"
					@update:model-value="scrollToTop"
				/>
			</div>

			<div class="flex flex-col items-center justify-center flex-1 mt-16">
				<UIcon
					name="i-heroicons-envelope-open-20-solid"
					class="w-6 h-6 mx-auto text-gray-400 dark:text-gray-500 mb-4"
				/>
				<p class="text-sm text-center text-gray-900 dark:text-white mb-4">No more posts to show</p>
				<UButton icon="i-heroicons-arrow-up" color="gray" size="sm" @click="scrollToTop">
					Scroll To Top
				</UButton>
			</div>
		</UPageBody>
	</UContainer>
</template>
