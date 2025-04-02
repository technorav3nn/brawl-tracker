<script setup lang="ts">
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
		<div class="flex w-full justify-between">
			<div>
				{{ totalWins }}
				{{ stage }}
				{{ winsUntilNextStage }}
			</div>
			<div class="flex flex-col items-center gap-6">
				<div class="flex w-full flex-row items-center gap-2">
					<UProgress size="lg" :modelValue="MEGA_PIG_WINS_PER_STAGE - winsUntilNextStage" :max="MEGA_PIG_WINS_PER_STAGE" />

					<div>
						<NuxtImg src="/icons/clubs/megapig-star.png" alt="Mega Pig Star" width="70" height="70" />
					</div>
				</div>
				<NuxtImg src="/other/megapig-full.png" alt="Mega Pig" width="350" height="250" class="object-contain" />
			</div>
		</div>
	</UiPageSection>
</template>
