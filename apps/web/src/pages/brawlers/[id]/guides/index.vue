<script setup lang="ts">
import { useBrawlerStore } from "$components/features/brawler/brawler-store";

const { id } = useRoute("brawlers-id-guides").params;

const { data: guides } = useLazyQuery(guidesForBrawler(id));
const brawlerStore = useBrawlerStore();

useSeoMeta({
	title: `${brawlerStore.brawler?.name} Guides`,
	description: "View guides and builds, or create your own!",
	titleTemplate: "%s | Guides | %siteName",
});

const { data: session } = await authClient.useSession(useFetch);
</script>

<template>
	<UiPageSection
		title="Guides"
		description="View guides and builds, or create your own!"
		orientation="vertical"
		class="space-y-2! divide-y-0!"
	>
		<div />
		<template #links>
			<UButton :disabled="session === null" :to="`/brawlers/${id}/guides/create`" size="md" icon="i-heroicons-plus">
				Create
			</UButton>
		</template>
		<UPageGrid v-if="guides?.length !== 0" class="gap-4">
			<GuidesGuideCard v-for="guide in guides" :key="guide.id" :guide :brawler-id="id" />
		</UPageGrid>
		<div v-else class="flex w-full items-center justify-center">
			<p class="text-sm text-muted">No guides found. Why don't you try making one?</p>
		</div>
	</UiPageSection>
</template>
