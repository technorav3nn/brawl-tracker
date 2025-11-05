<script setup lang="ts">
import type { Battlelog } from "@brawltracker/brawl-stars-api";

const route = useRoute("players-tag");

const { data: battlelog, status } = useLazyQuery(playersBattlelogDetailQuery(route.params.tag));

const castBattle = (b: any) => b as unknown as Battlelog;
</script>

<template>
	<UiPageSection
		class="divide-y-0"
		title="Battlelog"
		description="View all of the past 25 battles of the player"
		orientation="vertical"
	>
		<div class="flex w-full flex-col items-center gap-5">
			<template v-if="status === 'pending'">
				<USkeleton v-for="i in 10" :key="i" class="h-40 w-full" />
			</template>
			<template v-else-if="battlelog?.length !== 0">
				<PlayersBattlelogBattle v-for="battle in battlelog" :key="battle.battleTime" :battlelog-entry="castBattle(battle)" />
			</template>
			<UAlert
				v-else
				class="w-full"
				variant="subtle"
				:ui="{ wrapper: 'gap-2', icon: 'size-5' }"
				icon="i-heroicons-exclamation-triangle"
				color="warning"
				title="No battles found"
				description="This player has no battles in the last 25 battles."
			/>
		</div>
	</UiPageSection>
</template>
