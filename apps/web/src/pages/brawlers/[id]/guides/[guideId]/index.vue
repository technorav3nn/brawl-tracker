<script setup lang="ts">
/* eslint-disable vue/no-v-html */
import type { TocLink } from "@nuxt/content";
import { load } from "cheerio";
import { format } from "date-fns/format";
import { LazyModalsConfirmationModal } from "#components";
import type { PageLink } from "#ui/types";
import { useBrawlerStore } from "$components/features/brawler/brawler-store";
import { normalCaseToKebabCase } from "$lib/utils/common";

const route = useRoute("brawlers-id-guides-guideId");
const { guideId } = route.params;

const brawlerStore = useBrawlerStore();

const { data: guide, suspense } = useQuery(guideById(guideId));
await suspense();

useSeoMeta({
	title: `${guide.value!.name} | ${brawlerStore.brawler?.name} Guides`,
	description: guide.value!.shortDescription,
});

const $ = load(guide.value!.editorHtml);

const tocs = computed(() => {
	const headings = $("h1, h2, h3, h4");
	return headings
		.map((_, el) => {
			const title = $(el).text();
			const tagId = $(el).attr("id") ?? title.toLowerCase().replaceAll(/\s/g, "-");

			$(el).attr("id", tagId);

			return { depth: 2, id: tagId, text: title } satisfies TocLink;
		})
		.get();
});

const toast = useToast();
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
];

const html = computed(() => {
	const headings = $("h3, h2");
	if (!headings) return $.html();

	headings.each((_, el) => {
		const title = $(el).text();
		const tagId = title.toLowerCase().replaceAll(/\s/g, "-");
		$(el).attr("id", tagId);
	});

	return $.html();
});

const queryClient = useQueryClient();
const overlay = useOverlay();
const confirmModal = overlay.create(LazyModalsConfirmationModal, {
	props: {
		description: "Are you sure you want to delete this guide? This action cannot be undone.",
		labels: ["Cancel", "Delete"],
		onSuccess: async (state) => {
			if (!state) return;
			try {
				await $fetch("/api/guides/delete", {
					body: { id: guideId },
					method: "DELETE",
				});
				toast.add({
					title: "Guide Deleted",
					description: "The guide has been deleted successfully!",
					icon: "i-heroicons-check-circle",
					color: "success",
				});
				await queryClient.invalidateQueries({ queryKey: guideKeys.allByBrawler(route.params.id) });
				await navigateTo(`/brawlers/${route.params.id}/guides`);
			} catch (error) {
				console.error(error);
				toast.add({
					title: "Error",
					description: "There was an error deleting the guide. Please try again.",
					icon: "i-heroicons-x-circle",
					color: "error",
				});
			}
		},
	},
});

const { data: session } = await authClient.useSession(useFetch);

function deleteGuide() {
	void confirmModal.open();
}
</script>

<template>
	<template v-if="guide">
		<UPageHeader
			class="pt-3!"
			:title="guide.name"
			:description="guide.shortDescription"
			:ui="{ headline: 'flex flex-col gap-y-8 items-start' }"
		>
			<template #headline>
				<UBreadcrumb
					class="w-full"
					:items="[
						{
							label: 'Guides',
							icon: 'i-heroicons-book-open',
							to: `/brawlers/${route.params.id}/guides`,
						},
						{ label: guide!.name },
					]"
				/>
				<div class="flex items-center gap-x-2">
					<UBadge variant="subtle" color="primary"> {{ brawlerStore.brawler?.name }} Guide </UBadge>
					<span class="text-gray-500 dark:text-gray-400">
						&middot;&nbsp;&nbsp;<time>{{ format(new Date(guide.createdAt), "MMMM Mo y") }}</time>
					</span>
					<span v-if="guide.createdAt !== guide.updatedAt" class="text-gray-500 dark:text-gray-400">
						&middot;&nbsp;&nbsp;<time>Updated {{ format(new Date(guide.updatedAt), "MMMM Mo y") }}</time>
					</span>
				</div>
			</template>
			<template #title>
				<div :id="normalCaseToKebabCase(guide.name.toLowerCase())">
					{{ guide.name }}
				</div>
			</template>
			<div class="mt-4 flex flex-wrap items-center justify-between gap-6">
				<UUser
					:name="guide.user.name"
					:avatar="{ alt: guide.user.name, src: guide.user.image ?? undefined }"
					:description="guide.user.tag ?? undefined"
					:to="`/users/${guide.user.id}`"
				/>
				<div class="flex items-center gap-x-2">
					<UButton
						v-if="guide.user.id === session?.user?.id"
						:to="`/brawlers/${route.params.id}/guides/${route.params.guideId}/update`"
						color="neutral"
						variant="subtle"
						class="w-fit"
						icon="i-heroicons-pencil-square"
						block
					>
						Update
					</UButton>
					<UButton
						v-if="guide.user.id === session?.user?.id"
						color="error"
						variant="solid"
						class="w-fit"
						icon="i-heroicons-trash"
						block
						@click="deleteGuide"
					>
						Delete
					</UButton>
				</div>
			</div>
		</UPageHeader>

		<UPage>
			<UPageBody>
				<article
					class="html-content-container prose max-w-full break-words whitespace-pre-line prose-zinc focus:outline-none dark:prose-invert prose-headings:my-1 prose-p:my-0 prose-blockquote:my-0 prose-pre:my-0 prose-ol:-my-0 prose-ul:-my-0 prose-li:-my-0 prose-table:my-0 prose-img:my-1"
					v-html="html"
				/>
			</UPageBody>
			<template #right>
				<UContentToc
					v-if="tocs.length > 0"
					highlight
					highlight-color="primary"
					:ui="{ root: 'top-[calc(var(--ui-header-height)+40px)]!' }"
					:links="tocs"
				>
					<template #bottom>
						<div class="hidden space-y-6 lg:block">
							<USeparator v-if="tocs.length !== 0" />
							<UPageLinks title="More" :links="links" />
						</div>
					</template>
				</UContentToc>
				<UContentToc
					v-else
					:ui="{ root: 'top-[calc(var(--ui-header-height)+46px)]!' }"
					:links="[{ text: guide.name, depth: 2, id: normalCaseToKebabCase(guide.name.toLowerCase()) }]"
				>
					<template #bottom>
						<UPageLinks title="More" :links="links" />
					</template>
				</UContentToc>
			</template>
		</UPage>
	</template>
</template>
