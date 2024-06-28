<script setup lang="ts">
import { useBrawlerStore } from "$components/features/brawler/brawler-store";

definePageMeta({
	// eslint-disable-next-line consistent-return
	middleware: (to) => {
		const tab = to.path.split("/")[3]!;
		const id = to.params.id;
		if (!tab) {
			return navigateTo(`/brawlers/${id}/info`);
		}
	},
});

const route = useRoute("brawlers-id");
const brawlerId = route.params.id;

const brawlerStore = useBrawlerStore();
const { data: brawler } = await useFetch(`/api/brawlers/${brawlerId}`);

watchEffect(() => brawlerStore.setBrawler(brawler.value!));

function createTabLink(tab: string) {
	return `/brawlers/${brawler.value?.id}/${tab}`;
}

const links = [
	{
		label: "Info",
		icon: "i-heroicons-information-circle",
		to: createTabLink("info"),
	},
	{
		label: "Stats",
		icon: "i-heroicons-chart-bar",
		to: createTabLink("stats"),
	},
	{
		label: "Cosmetics",
		icon: "i-heroicons-swatch",
		to: createTabLink("cosmetics"),
	},
];

const breadcrumbLinks = [
	{ label: "Brawlers", to: "/brawlers", icon: "i-tabler-swords" },
	{ label: brawler.value?.name || "Brawler" },
];
</script>

<template>
	<UContainer v-if="brawler">
		<UPage>
			<UPageBody>
				<UBreadcrumb :links="breadcrumbLinks" class="mb-6" />
				<div class="flex flex-row gap-3">
					<NuxtImg
						:src="brawler.imageUrl2"
						height="100"
						width="100"
						:alt="brawler.name"
						format="webp"
						class="rounded border border-border"
						loading="eager"
						preload
					/>
					<div class="flex flex-col items-start justify-between">
						<h1 class="text-4xl font-bold">{{ brawler.name }}</h1>
						<div class="flex flex-col">
							<p class="flex items-center gap-1 text-gray-600 dark:text-gray-300">
								<UIcon name="i-tabler-diamond" class="h-5 w-5 stroke-[1.5]" />
								{{ brawler.rarity.name }}
							</p>
							<p class="flex items-center gap-1 text-gray-600 dark:text-gray-300">
								<UIcon name="i-tabler-swords" class="h-5 w-5 stroke-[1.5]" />
								{{ brawler.class.name }}
							</p>
						</div>
					</div>
				</div>
				<p class="mt-3 max-w-4xl text-sm text-gray-500 dark:text-gray-400 lg:text-base mb-2">
					{{ brawler.description }}
				</p>
				<UHorizontalNavigation
					:ui="{ after: 'after:w-full after:!inset-x-0' /* base: '!h-[2.8rem]' */ }"
					:links="links"
					class="border-b border-gray-200 dark:border-gray-800"
				/>
				<div class="mt-2">
					<NuxtPage />
				</div>
			</UPageBody>
		</UPage>
	</UContainer>
</template>
