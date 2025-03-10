<script setup lang="ts">
import { type AccordionItem } from "#ui/types";
import { useBrawlerStore } from "$components/features/brawler/brawler-store";

const brawlerStore = useBrawlerStore();
const { brawlerCdnData } = storeToRefs(brawlerStore);

if (!brawlerCdnData) {
	throw createError({ statusCode: 404, message: "Brawler not found" });
}

const changes = computed(() => brawlerCdnData.value!.history ?? []);

const selectedType = ref<string | undefined>(undefined);

const items = computed<(AccordionItem | null)[]>(() =>
	changes
		.value!.map((change) => {
			if (!change.description) return null;
			return {
				// Feb 2nd, 2022 format
				label: new Date(String(change.date)).toLocaleDateString("en-US", {
					year: "numeric",
					month: "long",
					day: "numeric",
				}),
				type: change.kind,
				content: change.description,
			};
		})
		.filter(Boolean)
		.filter((item) => selectedType.value === undefined || selectedType.value === "None" || item?.type === selectedType.value)
);
</script>

<template>
	<UDashboardSection
		title="Changes"
		description="View the changes made to this brawler over time!"
		orientation="vertical"
		class="!divide-y-0 !space-y-2"
	>
		<div class="!pt-0 flex flex-col gap-4">
			<div class="flex justify-end">
				<USelectMenu
					v-model="selectedType"
					:options="['None', 'Buff', 'Nerf', 'Neutral']"
					class="w-36"
					placeholder="Filter by type"
					:disabled="!items.length"
				/>
			</div>
			<div v-if="!items.length" class="text-center text-gray-500 dark:text-gray-400">No changes found.</div>
			<UAccordion
				v-else
				defaultOpen
				multiple
				:items="items as AccordionItem[]"
				:ui="{ wrapper: ' flex flex-col w-full border border-border border-t-0 rounded-md ' }"
			>
				<template #default="{ item, index, open }">
					<UButton
						color="gray"
						variant="ghost"
						class="px-2 !py-2.5 border-b border-t border-gray-200 dark:border-gray-800 rounded-b-none"
					>
						<template #leading>
							<NuxtImg
								:src="
									item.type === 'Buff'
										? '/icons/changes/buff.webp'
										: item.type === 'Nerf'
											? '/icons/changes/nerf.webp'
											: '/icons/changes/neutral.webp'
								"
								width="25"
								height="25"
							/>
						</template>

						<span class="truncate">{{ index + 1 }}. {{ item.label }}</span>

						<template #trailing>
							<UIcon
								name="i-heroicons-chevron-right-20-solid"
								class="w-5 h-5 ms-auto transform transition-transform duration-200"
								:class="[open && 'rotate-90']"
							/>
						</template>
					</UButton>
				</template>
				<template #item="{ item }">
					<p class="px-2 text-black dark:text-gray-300">{{ item.content }}</p>
				</template>
			</UAccordion>
		</div>
	</UDashboardSection>
</template>
