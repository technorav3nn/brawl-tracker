<script setup lang="ts">
import { Image } from "@unpic/vue";
import { createGetCachedData } from "$lib/utils/nuxt";

const nuxtApp = useNuxtApp();
const router = useRouter();

const { data: brawlers, status } = await useLazyFetch("/api/brawlers", {
	server: true,
	transform: (data) => data.list.reverse(),
	getCachedData: createGetCachedData(nuxtApp),
});
const selected = ref(
	brawlers.value?.find((brawler) => brawler.id === Number(router.currentRoute.value.query.brawler ?? 16000000))
);
watch(selected, () => {
	router.push({ query: { ...router.currentRoute.value.query, brawler: selected.value?.id } });
});
</script>

<template>
	<USelectMenu
		v-model="selected"
		:loading="status === 'pending'"
		:options="brawlers ?? []"
		optionAttribute="name"
		searchable
		searchable-placeholder="Search for a brawler..."
		class="w-48"
	>
		<template #label>
			<div v-if="selected" class="flex flex-row items-center gap-2">
				<Image :src="selected?.imageUrl2" class="rounded-sm" width="20" height="20" />
				<span>{{ selected?.name }}</span>
			</div>
			<span v-else>Select a brawler...</span>
		</template>
	</USelectMenu>
</template>
