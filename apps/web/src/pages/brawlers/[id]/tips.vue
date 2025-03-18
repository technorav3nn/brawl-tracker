<script setup lang="ts">
import { useBrawlerStore } from "$components/features/brawler/brawler-store";

const brawlerStore = useBrawlerStore();
const { brawlerCdnData } = storeToRefs(brawlerStore);

if (!brawlerCdnData) {
	throw createError({ statusCode: 404, message: "Brawler not found" });
}

const tips = computed(() => brawlerCdnData.value!.tips ?? []);
</script>

<template>
	<UiPageSection title="Tips" description="View tips on how to play this brawler!" orientation="vertical" class="divide-y-0!">
		<div class="w-full pt-0!">
			<div v-if="tips.length === 0" class="flex h-32 items-center justify-center">
				<p class="text-gray-500 dark:text-gray-400">No tips available</p>
			</div>
			<article class="max-w-none">
				<ProseUl>
					<ProseLi v-for="tip in tips" :key="tip">
						{{ tip }}
					</ProseLi>
				</ProseUl>
			</article>
		</div>
	</UiPageSection>
</template>
