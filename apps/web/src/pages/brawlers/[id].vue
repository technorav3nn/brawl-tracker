<script setup lang="ts">
import type { CdnBrawler } from "@brawltracker/cdn/v2";
import type { NavigationMenuItem } from "@nuxt/ui";
import { breakpointsTailwind } from "@vueuse/core";
import { useBrawlerStore } from "$components/features/brawler/brawler-store";
import { RARITY_COLOR_CLASSES } from "$lib/utils/brawl-stars/colors";
import { normalCaseToKebabCase } from "$lib/utils/common";

definePageMeta({
	middleware: (to) => {
		const tab = to.path.split("/")[3]!;
		const { id } = to.params as { id: string };
		if (!tab) {
			return navigateTo(`/brawlers/${id}/info`);
		}
	},
});

const route = useRoute("brawlers-id");
const brawlerId = route.params.id;

const brawlerStore = useBrawlerStore();

const brawlerOptions = computed(() => brawlerByIdQuery(brawlerId));
const { data: brawler, error: apiError, suspense: brawlerSuspense } = useQuery(brawlerOptions);
await brawlerSuspense();

if (apiError.value) {
	throw createError({
		statusCode: 500,
		message: "Error fetching brawler API data",
		fatal: true,
	});
}

const brawlerCdnDataOptions = computed(() => brawlerCdnByIdQuery(brawlerId));
const { data: brawlerCdnData, error: cdnError, suspense: cdnSuspense } = useQuery(brawlerCdnDataOptions);
await cdnSuspense();

if (cdnError.value) {
	throw createError({
		statusCode: 500,
		message: "Error fetching brawler CDN data",
		fatal: true,
	});
}

watchEffect(() => brawlerStore.setBrawlerCdnData(brawlerCdnData.value as unknown as CdnBrawler));
watchEffect(() => brawlerStore.setBrawler(brawler.value!));

function createTabLink(tab: string) {
	return `/brawlers/${brawler.value?.id}/${tab}`;
}

const guidesActive = computed(() => route.path.includes("guides"));

const links = computed<NavigationMenuItem[]>(() => [
	{
		label: "Info",
		icon: "i-heroicons-information-circle",
		to: createTabLink("info"),
	},
	{
		label: "Stats",
		icon: "i-heroicons-chart-bar-square",
		to: createTabLink("stats"),
	},
	{
		label: "Cosmetics",
		icon: "i-heroicons-swatch",
		to: createTabLink("cosmetics"),
	},
	{
		label: "Guides",
		icon: "i-heroicons-book-open",
		to: createTabLink("guides"),
		active: guidesActive.value,
	},
	{
		label: "Tips",
		icon: "i-heroicons-list-bullet-20-solid",
		to: createTabLink("tips"),
	},
	{
		label: "Changes",
		icon: "i-heroicons-scale",
		to: createTabLink("changes"),
	},
]);

const breadcrumbLinks = [
	{ label: "Brawlers", to: "/brawlers", icon: "i-heroicons-star" },
	{ label: brawler.value?.name || "Brawl" },
];

const target = ref<HTMLElement | null>(null);
const brawlerNav = useId();
onMounted(() => {
	if (!target.value) {
		target.value = document.querySelector(`#${brawlerNav}`) as HTMLElement;
	}
});

// Sticky navigation detection and stuff
const isBrawlerNavSticky = ref(false);
function onScroll() {
	if (!target.value) return;
	const elementTop = target.value.getBoundingClientRect().top;
	isBrawlerNavSticky.value = elementTop <= 64; // 64px is top-16 in Tailwind
}

const breakpoints = useBreakpoints(breakpointsTailwind);

onMounted(() => {
	window.addEventListener("scroll", onScroll);
	onScroll();
});
onUnmounted(() => {
	window.removeEventListener("scroll", onScroll);
});

const brawlerClass = computed(() => {
	if (brawler.value?.class.name === "Unknown") {
		return brawlerStore.brawlerCdnData?.stats.class;
	}

	return brawler.value?.class.name;
});
</script>

<template>
	<div>
		<UPage v-if="brawler">
			<UPageBody class="space-y-0">
				<UContainer>
					<UBreadcrumb :items="breadcrumbLinks" class="mb-6" />
					<div class="flex flex-row gap-3">
						<NuxtImg
							:src="brawler.imageUrl2"
							height="100"
							width="100"
							:alt="brawler.name"
							format="webp"
							class="rounded-sm border border-(--ui-border)"
							loading="eager"
							preload
						/>
						<div class="flex flex-col items-start justify-between">
							<h1 class="text-4xl font-bold">{{ brawler.name }}</h1>
							<div class="flex flex-col">
								<div class="flex items-center gap-1 font-medium">
									<UIcon
										name="i-heroicons-sparkles-20-solid"
										class="inline-block h-5 w-5"
										:class="[
											RARITY_COLOR_CLASSES[brawler.rarity.name as keyof typeof RARITY_COLOR_CLASSES],
											brawler.rarity.name === 'Ultra Legendary' && ' bg-clip-border!',
										]"
										:style="{ '--__ul__direction': 'reverse', animationDuration: '25s !important' }"
									/>
									<p
										:style="{ '--__ul__direction': 'reverse', animationDuration: '25s !important' }"
										:class="[RARITY_COLOR_CLASSES[brawler.rarity.name as keyof typeof RARITY_COLOR_CLASSES]]"
									>
										{{ brawler.rarity.name }}
									</p>
								</div>
								<div class="flex items-center gap-1 font-medium">
									<NuxtImg
										:src="`/icons/brawler-classes/${normalCaseToKebabCase((brawlerClass ?? '')?.toLowerCase())}.png`"
										width="16"
										height="16"
										class="size-5"
									/>
									<p>{{ brawlerClass }}</p>
								</div>
							</div>
						</div>
					</div>
					<p class="mt-3 mb-3 max-w-4xl text-sm text-neutral-500 sm:mb-1 lg:text-base dark:text-neutral-400">
						{{ brawler.description }}
					</p>
				</UContainer>

				<section class="sticky top-16 z-40 border-b border-neutral-200 dark:border-neutral-800">
					<UContainer :id="brawlerNav" class="no-scrollbar flex gap-2 overflow-scroll bg-default/75 backdrop-blur">
						<AnimatePresence :initial="false" mode="popLayout">
							<Motion
								v-if="isBrawlerNavSticky && breakpoints.isGreaterOrEqual('md')"
								layout
								class="flex items-center"
								as="div"
								:initial="{ opacity: 0, x: -10 }"
								:animate="{ opacity: 1, x: 0 }"
								:exit="{ opacity: 0, x: -10 }"
								:transition="{ duration: 0.2 }"
							>
								<UUser
									:name="brawler.name"
									:description="brawlerClass"
									:avatar="{ src: brawler.imageUrl2, class: 'rounded-xs' }"
									class="whitespace-nowrap"
								/>
							</Motion>

							<Motion key="navigationMenu" layout="position" class="" as="div" :transition="{ duration: 0.2, delay: 0.01 }">
								<UNavigationMenu
									variant="pill"
									highlight
									:items="links"
									:ui="{
										link: 'after:h-[2px] after:absolute after:-bottom-2 after:inset-x-0 ',
										linkLabel: 'overflow-clip text-wrap',
										linkLeadingIcon: 'size-[15px] sm:size-5',
									}"
									class="w-full max-w-full!"
								/>
							</Motion>
						</AnimatePresence>
					</UContainer>
				</section>
				<UContainer>
					<div class="mt-4">
						<NuxtPage />
					</div>
				</UContainer>
			</UPageBody>
		</UPage>
	</div>
</template>
