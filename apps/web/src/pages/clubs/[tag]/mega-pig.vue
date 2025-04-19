<script setup lang="ts">
import { highLowToId, idToTag } from "@brawltracker/supercell-id-api/browser";

const {
	params: { tag },
} = useRoute("clubs-tag");
const { data: club, suspense } = useQuery(clubsMeowApiDetailQuery(tag.replace("#", "")));
await suspense();

const MEGA_PIG_TICKETS_PER_MEMBER = 15;
const MEGA_PIG_TOTAL_STAGES = 5;
const MEGA_PIG_WINS_PER_STAGE = 40;

const totalWins = computed(() => {
	return club.value!.AllianceMemberEntries.reduce((acc, entry) => acc + (entry.MegaPig?.Wins ?? 0), 0);
});

const stage = computed(() => {
	const result = Math.floor(totalWins.value / MEGA_PIG_WINS_PER_STAGE) + 1;
	return result > MEGA_PIG_TOTAL_STAGES ? MEGA_PIG_TOTAL_STAGES : result;
});

const winsUntilNextStage = computed(() => {
	const result = MEGA_PIG_WINS_PER_STAGE - (totalWins.value % MEGA_PIG_WINS_PER_STAGE);
	return result > 0 ? result : 0;
});
</script>

<template>
	<UiPageSection
		class="divide-y-0 pb-12 text-lg"
		title="Mega Pig"
		description="View information about this clubs Mega Pig"
		orientation="vertical"
	>
		<div class="flex w-full flex-col justify-between gap-4 sm:flex-row">
			<div class="flex flex-col">
				<p class="text-lg leading-none font-bold text-(--ui-primary)">{{ winsUntilNextStage }} MORE WINS FOR MEGA DROP</p>
				<div class="flex flex-col items-center gap-6">
					<div class="flex w-full flex-row items-center gap-2">
						<UProgress size="lg" :modelValue="MEGA_PIG_WINS_PER_STAGE - winsUntilNextStage" :max="MEGA_PIG_WINS_PER_STAGE" />

						<div class="relative">
							<NuxtImg src="/icons/clubs/megapig-star.png" alt="Mega Pig Star" width="100" height="100" />
							<p
								class="absolute inset-0 top-[37.8%] h-min text-center text-lg leading-none font-semibold tracking-[-0.08em] text-neutral-700 dark:text-neutral-200"
							>
								{{ stage }} / {{ MEGA_PIG_TOTAL_STAGES }}
							</p>
						</div>
					</div>
					<NuxtImg src="/other/megapig-full.png" alt="Mega Pig" width="350" height="250" class="object-contain" />
				</div>
			</div>
			<div class="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-3">
				<ClubsClubMemberCard
					v-for="member in club?.AllianceMemberEntries"
					:key="member.AccountId.Low"
					:member="{
						name: member.Name,
						tag: idToTag(highLowToId(`${member.AccountId.High}-${member.AccountId.Low}`).toString()),
						icon: { id: member.ProfileIcon },
					}"
					:megaPigWins="member.MegaPig?.Wins ?? 0"
					:megaPigTicketsLeft="member.MegaPig?.TIcketsLeft ?? MEGA_PIG_TICKETS_PER_MEMBER"
				/>
			</div>
		</div>
	</UiPageSection>
</template>
