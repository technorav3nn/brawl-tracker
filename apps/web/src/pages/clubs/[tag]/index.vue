<script setup lang="ts">
const {
	params: { tag },
} = useRoute("clubs-tag");
const { data: club } = useQuery(clubsDetailQuery(tag));
</script>

<template>
	<template v-if="club">
		<UiPageSection class="divide-y-0" title="Description">
			<div class="-mt-4 pt-0!">
				<ProseBlockquote class="py-4 md:w-180">
					{{ club.description ?? "Description not available" }}
				</ProseBlockquote>
			</div>
		</UiPageSection>
		<UiPageSection
			class="divide-y-0 *:p-0!"
			title="Stats"
			description="Some useful statistics about the club"
			orientation="vertical"
		>
			<div class="flex flex-col gap-4 pt-0! md:flex-row">
				<ClubsClubStatsTable class="w-full" />
				<ClubsClubMemberTable class="w-full" />
			</div>
		</UiPageSection>
		<UiPageSection
			class="divide-y-0 pt-4"
			title="Members"
			description="Every single member of the club, view their profile and stats"
			orientation="vertical"
		>
			<div class="grid grid-cols-1 gap-4 pt-0! min-[530px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
				<ClubsClubMemberCard v-for="member in club.members" :key="member.tag" :member="member" />
			</div>
		</UiPageSection>
	</template>
</template>
