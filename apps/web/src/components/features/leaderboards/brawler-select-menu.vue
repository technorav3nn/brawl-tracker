<script setup lang="ts">
import { CDN_URL_V2 } from "@brawltracker/cdn/v2";
import { Image } from "@unpic/vue";
import type { SelectMenuItem } from "#ui/types";

const router = useRouter();
const route = useRoute();

const { data: brawlers, status } = await useFetch("/api/brawlers", {
	server: true,
	transform: (data) =>
		data.list.reverse().map(
			(b) =>
				({
					label: b.name,
					value: b.id,
					avatar: { src: `${CDN_URL_V2}/brawlify/brawlers/emoji/${b.id}.png` },
				}) satisfies SelectMenuItem & { value: number }
		),
});

const selected = ref(brawlers.value?.find((brawler) => brawler.value === Number(route.query.brawler)));

watch(selected, () => {
	router.push({ query: { ...route.query, brawler: selected.value?.value } });
});
</script>

<template>
	<USelectMenu
		:model-value="status === 'pending' ? undefined : selected"
		:loading="status === 'pending'"
		:items="brawlers ?? []"
		option-attribute="name"
		searchable
		searchable-placeholder="Search for a brawler..."
		class="w-48"
		@update:model-value="($event) => (selected = $event)"
	>
		<template #leading="{ modelValue, ui }">
			<Image v-if="modelValue" width="20" height="20" v-bind="modelValue.avatar" :class="ui.leadingAvatar()" loading="lazy" />
		</template>
		<template #item-leading="{ item }">
			<Image width="20" height="20" :src="item.avatar.src" class="size-6 object-contain" loading="lazy" />
		</template>
	</USelectMenu>
</template>
