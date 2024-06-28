<script setup lang="ts">
import { CDN_URL } from "@brawltracker/cdn";
import { IconTag, IconBookmarkPlus, IconShare3, IconShieldStar } from "@tabler/icons-vue";
import { upperFirstCharacter } from "$lib/util/common";

definePageMeta({
	title: "Player",
	description: "View a player's profile, stats, and more!",
	middleware: "player-not-found",
});

const TABS = ["stats", "brawlers", "battlelog"] as const;

const {
	params: { tag },
	fullPath,
} = useRoute("players-tag");

const currentTab = ref(fullPath.split("/")[3]);
// API doesn't accept a # in the tag
const fixedTag = decodeURIComponent(tag).replace("#", "");

const { data: player } = await useFetch(`/api/players/${fixedTag}`);

const dataminedProfile = computed(() => player.value?.datamined.response);
const officialProfile = computed(() => player.value?.official);
const icons = computed(() => [
	dataminedProfile.value?.BattleCard.FirstIcon,
	dataminedProfile.value?.BattleCard.SecondIcon,
]);
</script>

<template>
	<div v-if="dataminedProfile">
		<div class="mb-2 flex flex-row items-center justify-between gap-2">
			<UiButton asChild variant="link" class="mr-3 px-0 text-base font-medium text-foreground">
				<NuxtLink href="/brawlers">← Go Back</NuxtLink>
			</UiButton>
			<div class="flex flex-row gap-2">
				<UiButton variant="default" size="sm" class="flex gap-1">
					<IconBookmarkPlus class="size-5 stroke-[1.7]" />
					Save
				</UiButton>
				<UiButton variant="default" size="sm" class="flex gap-1">
					<IconShare3 class="size-5 stroke-[1.7]" />
					Share
				</UiButton>
			</div>
		</div>
		<section class="justify-betweengap-0 flex flex-row">
			<div
				class="flex w-3/4 flex-row gap-2.5 rounded-md rounded-r-none border border-border bg-card p-3.5 sm:w-full"
			>
				<NuxtImg
					:src="`${CDN_URL}/avatars/${dataminedProfile.ProfileIcon}.png`"
					height="100"
					width="100"
					:alt="`${dataminedProfile.Name}'s' avatar`"
					format="webp"
					class="rounded"
				/>
				<div class="flex flex-col items-start justify-between">
					<h1 class="text-3xl font-bold">{{ dataminedProfile.Name }}</h1>
					<div class="flex flex-col">
						<p class="flex items-center gap-1 text-muted-foreground">
							<IconTag class="h-5 w-5 stroke-[1.7]" />
							{{ tag }}
						</p>
						<p class="flex items-center gap-1 text-muted-foreground">
							<IconShieldStar class="h-5 w-5 stroke-[1.7]" />
							{{ officialProfile?.club.name ?? "No Club" }}
						</p>
					</div>
				</div>
			</div>
			<div class="flex flex-col gap-1">
				<div
					class="flex h-full min-w-[10.25rem] flex-col rounded-md rounded-l-none border border-l-0 border-border bg-card p-3.5"
				>
					<p class="font-semibold">d</p>
					<div class="flex flex-row gap-1">
						<NuxtImg
							v-for="imageId in icons"
							:key="imageId"
							:src="`${CDN_URL}/avatars/${imageId}.png`"
							height="60"
							width="60"
							:alt="`Icon ${imageId}`"
							format="webp"
							class="rounded sm:h-full sm:w-full"
						/>
					</div>
				</div>
			</div>
		</section>
		<UiTabs v-model:modelValue="currentTab" class="mt-4">
			<UiTabsList>
				<UiTabsTrigger v-for="tab in TABS" :key="tab" :value="tab" asChild>
					<NuxtLink :to="`/players/${encodeURIComponent(tag)}/${tab}`">
						{{ upperFirstCharacter(tab) }}
					</NuxtLink>
				</UiTabsTrigger>
			</UiTabsList>
		</UiTabs>
		<NuxtPage />
	</div>
</template>
