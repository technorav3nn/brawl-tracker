<script setup lang="ts">
const route = useRoute();
const router = useRouter();

const clubName = ref<string>("");
const searchQuery: Ref<string> = ref((route.query.q as string) || "");

watch(
	() => searchQuery.value,
	() => router.replace(searchQuery.value ? { query: { q: searchQuery.value } } : {})
);

const options = computed(() => ({
	...clubsRntApiSearchQuery(searchQuery.value),
	enabled: false,
	retry: false,
}));

const { data, refetch, status, isFetching } = useQuery(options);

function onSearchClick() {
	if (clubName.value.trim().length === 0) return;
	searchQuery.value = clubName.value;

	console.log("searching for", clubName.value, searchQuery.value);
	void refetch();
}

onMounted(() => {
	if (searchQuery.value && searchQuery.value.trim().length > 0) {
		clubName.value = searchQuery.value;
		void refetch();
	}
});
</script>

<template>
	<UPage>
		<UPageBody>
			<UPageHero
				title="Search for a club"
				description="Enter a club name to search for and learn more about it!"
				icon="i-heroicons-magnifying-glass-20-solid"
				:ui="{
					container: 'lg:py-24 lg:pb-16 gap-8!',
					title: 'text-3xl font-bold tracking-tight text-neutral-900 dark:text-white sm:text-4xl lg:text-5xl',
				}"
			>
				<UContainer class="flex w-full max-w-[450px] flex-col items-center justify-center">
					<div class="flex w-full flex-row items-center gap-2 rounded-full border border-(--ui-border) p-1">
						<UInput
							v-model="clubName"
							size="xl"
							class="w-full rounded-full"
							variant="none"
							placeholder="Search for a club..."
							@keyup.enter="onSearchClick"
						/>
						<UButton
							size="lg"
							class="mr-0.5 size-9 rounded-full"
							icon="i-heroicons-magnifying-glass-20-solid"
							aria-label="Search"
							variant="subtle"
							color="neutral"
							@click="onSearchClick"
						/>
					</div>
				</UContainer>
				<template v-if="status === 'success' && data?.length === 0">
					<div class="flex w-full items-center justify-center">
						<p class="text-center text-lg font-medium tracking-wide text-neutral-500">
							No clubs found matching your search criteria.
						</p>
					</div>
				</template>
				<UPageGrid v-else class="gap-4!">
					<template v-if="status === 'pending' && isFetching">
						<UCard v-for="index in 20" :key="index" variant="outline" class="!p-0" :ui="{ body: '!p-0' }">
							<USkeleton class="h-[89px] w-full" />
						</UCard>
					</template>

					<template v-else>
						<ClubsSearchResultCard v-for="club in data" :key="club.id.tag" :club />
					</template>
				</UPageGrid>
			</UPageHero>
		</UPageBody>
	</UPage>
</template>
