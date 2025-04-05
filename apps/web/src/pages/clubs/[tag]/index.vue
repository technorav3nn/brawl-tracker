<script setup lang="ts">
const {
	params: { tag },
} = useRoute("clubs-tag");
const { data: club, status } = useQuery(clubsDetailQuery(tag));
</script>

<template>
	<UiPageSection class="divide-y-0" title="Description">
		<div class="-mt-4 pt-0!">
			<ProseBlockquote class="py-4 md:w-180">
				<template v-if="status === 'pending'">
					<div class="flex flex-col gap-2">
						<USkeleton class="h-4 w-3/4" />
						<USkeleton class="h-4 w-1/2" />
					</div>
				</template>
				<template v-else>{{ club!.description ?? "Description not available" }}</template>
			</ProseBlockquote>
		</div>
	</UiPageSection>
	<UiPageSection
		class="h-full divide-y-0 *:p-0!"
		title="Stats"
		description="Some useful statistics about the club"
		orientation="vertical"
	>
		<div class="pt-0!">
			<div class="flex flex-col gap-4 md:flex-row" :class="[status === 'pending' && 'h-[250px]']">
				<ClubsClubStatsTable class="flex w-full flex-col" />
				<ClubsClubMemberTable class="flex w-full flex-col" />
			</div>
		</div>
	</UiPageSection>
	<UiPageSection
		class="divide-y-0 pt-4"
		title="Members"
		description="Every single member of the club, view their profile and stats"
		orientation="vertical"
	>
		<div class="grid grid-cols-1 gap-4 pt-0! min-[530px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
			<template v-if="club">
				<ClubsClubMemberCard v-for="member in club.members" :key="member.tag" :member="member" />
			</template>
			<template v-else>
				<!-- <USkeleton v-for="index in 20" :key="index" class="h-20 w-full" /> -->
				<UPageCard v-for="index in 20" :key="index" class="w-full" :ui="{ container: 'p-0!' }">
					<div class="flex flex-row gap-2">
						<USkeleton class="min-h-[97px] min-w-[97px] rounded-r-none" />
						<div class="flex w-full flex-col items-start justify-center gap-2 truncate px-1 py-2">
							<USkeleton class="h-3 w-3/4" />
							<USkeleton class="h-3 w-1/2" />
							<div class="mt-1 flex w-full flex-row items-center gap-2">
								<NuxtImg width="22" height="22" src="/icons/player/trophy.webp" alt="Trophy" class="rounded-full grayscale" />
								<USkeleton class="h-3.5 w-1/4" />
							</div>
						</div>
					</div>
				</UPageCard>
			</template>
		</div>
	</UiPageSection>
</template>
