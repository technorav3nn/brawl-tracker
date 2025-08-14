<script setup lang="ts">
import { lowercaseFirstLetter } from "$lib/utils/common";

const emit = defineEmits<{ close: [boolean] }>();

const { data: session, isPending } = await authClient.useSession(useFetch);
const unfilteredFriends = computed(() => JSON.parse(session.value?.user.savedPlayers ?? "[]"));

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
	return 0;
});

console.log("sortedFriends", sortedFriends.value);

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

const closeSlideover = () => emit("close", true);
</script>

<template>
	<div class="w-full border-b border-neutral-200 px-4 py-5 dark:border-neutral-800">
		<h1 class="text-2xl font-semibold">Saved Players & Friends</h1>
		<p class="text-sm text-neutral-500 dark:text-neutral-400">
			View your saved players and imported Supercell ID Friends, and manage your saved players
		</p>
	</div>

	<div class="flex flex-col px-4">
		<div class="mb-2 flex flex-row gap-1">
			<UInput
				v-model="rawSearch"
				:disabled="isPending"
				class="mt-4 w-[56%]"
				:ui="{}"
				placeholder="Search friends"
				icon="i-heroicons-magnifying-glass-20-solid"
			/>
			<USelect
				:disabled="isPending"
				:modelValue="humanSort"
				class="mt-4 w-[44%]"
				:items="['None', 'Ascending', 'Descending']"
				icon="i-heroicons-adjustments-horizontal"
				@update:model-value="
					sort = lowercaseFirstLetter($event as string);
					humanSort = $event as string;
				"
			/>
		</div>
		<!--
 <div v-if="status === 'pending'" class="mt-4 flex flex-col items-center justify-center gap-2 px-4">
			<UiLoadingIndicator class="h-12 w-12" />
			<span class="text-lg text-neutral-500 dark:text-neutral-400">Loading...</span>
		</div> 
-->
		<div v-if="friends?.length === 0 && search.trim() === ''" class="mt-4">
			<p class="text-sm text-neutral-500 dark:text-neutral-400">You have no friends or saved tags</p>
		</div>
		<div v-else v-bind="containerProps" class="h-200px overflow-auto">
			<div v-bind="wrapperProps" :class="[isPending ? 'h-full!' : '']">
				<template v-if="isPending">
					<div v-for="index in 10" :key="index" class="block" style="height: 80px">
						<LazyAppProfileSlideoverFriend class="block" style="height: 80px" />
					</div>
				</template>
				<template v-else>
					<NuxtLink
						v-for="{ data: friend } in friends"
						:key="friend.name"
						class="block"
						:style="{
							height: '80px',
						}"
						:to="`/players/${encodeURIComponent(friend.tag!)}`"
						@click="closeSlideover"
					>
						<LazyAppProfileSlideoverFriend :key="friend.name" :friend="friend" />
					</NuxtLink>
				</template>
			</div>
		</div>
	</div>
</template>
