<script setup lang="ts">
import { highLowToId, idToTag } from "@brawltracker/supercell-id-api/browser";
import { lowercaseFirstLetter } from "$lib/utils/common";
import { createGetCachedData } from "$lib/utils/nuxt";

const nuxtApp = useNuxtApp();
const { data: unfilteredFriends, status } = useLazyFetch("/api/auth/scid/friends", {
	transform: (d) => d.data.friends,
	getCachedData: createGetCachedData(nuxtApp),
});

const sort = ref("none");
const humanSort = ref("None");
const rawSearch = ref("");
const search = refDebounced(rawSearch, 200);

// They're null because they're loading
const resolvedFriends = computed(() => (unfilteredFriends.value ? unfilteredFriends.value : []));

const sortedFriends = useSorted(resolvedFriends, (a, b) => {
	if (sort.value === "none") return 0;
	if (sort.value === "ascending") return a.name.localeCompare(b.name);
	if (sort.value === "descending") return b.name.localeCompare(a.name);
	if (sort.value === "status") return a.presence ? -1 : 1;
	return 0;
});

const searchedFriends = useArrayFilter(sortedFriends, (f) => f.name.toLowerCase().includes(search.value.toLowerCase()));
const unvirtualizedFriends = computed(() => searchedFriends.value);

const {
	containerProps,
	list: friends,
	wrapperProps,
} = useVirtualList(unvirtualizedFriends, {
	itemHeight: 80,
	itemWidth: 200,
});
</script>

<template>
	<div class="w-full py-5 px-4 border-b border-gray-200 dark:border-gray-800">
		<h1 class="text-2xl font-semibold">Friends</h1>
		<p class="text-gray-500 dark:text-gray-400 text-sm">
			View your Supercell ID friends and their profiles if you and your friend has connected to Supercell ID
		</p>
	</div>
	<div v-if="status === 'pending'" class="px-4 mt-4 flex flex-col gap-2 items-center justify-center">
		<UiLoadingIndicator class="w-12 h-12" />
		<span class="text-gray-500 dark:text-gray-400 text-lg">Loading Friends</span>
	</div>
	<div v-if="friends?.length === 0 && search.trim() !== ''" class="px-4 mt-4">
		<p class="text-gray-500 dark:text-gray-400 text-sm">You have no friends connected to Supercell ID</p>
	</div>

	<div class="px-4 flex flex-col">
		<div class="flex flex-row gap-1 mb-2">
			<UInput
				v-model="rawSearch"
				class="mt-4 w-[56%]"
				placeholder="Search friends"
				icon="i-heroicons-magnifying-glass-20-solid"
			/>
			<USelect
				:modelValue="humanSort"
				class="mt-4 w-[44%]"
				:options="['None', 'Ascending', 'Descending', 'Status']"
				icon="i-heroicons-adjustments-horizontal"
				@change="
					sort = lowercaseFirstLetter($event);
					humanSort = $event as string;
				"
			/>
		</div>
		<div v-bind="containerProps" class="h-200px overflow-auto">
			<div v-bind="wrapperProps">
				<NuxtLink
					v-for="{ data: friend } in friends"
					:key="friend.scid"
					class="block"
					:style="{
						height: '80px',
					}"
					:to="friend.applicationAccountId ? `/players/${idToTag(highLowToId(friend.applicationAccountId!))}` : undefined"
				>
					<LazyAppProfileSlideoverFriend :key="friend.scid" :friend="friend" />
				</NuxtLink>
			</div>
		</div>
	</div>
</template>
