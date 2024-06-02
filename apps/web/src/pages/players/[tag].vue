<script setup lang="ts">
import { upperFirstCharacter } from "$lib/util/common";

const {
	params: { tag },
	fullPath,
} = useRoute("players-tag");
const tabs = ["stats", "brawlers", "battlelog"] as const;
const currentTab = ref(fullPath.split("/")[3]);
</script>

<template>
	<div>
		<UiTabs v-model:modelValue="currentTab" class="mt-4">
			<UiTabsList>
				<UiTabsTrigger v-for="tab in tabs" :key="tab" :value="tab" asChild>
					<NuxtLink :to="`/players/${encodeURIComponent(tag)}/${tab}`">
						{{ upperFirstCharacter(tab) }}
					</NuxtLink>
				</UiTabsTrigger>
			</UiTabsList>
		</UiTabs>
		<NuxtPage />
	</div>
</template>
