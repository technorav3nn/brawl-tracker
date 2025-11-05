<script setup lang="ts">
import type { AccordionItem } from "#ui/types";
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
		.value!.map((change, index) => {
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
				value: index.toString(),
			};
		})
		.filter(Boolean)
		.filter((item) => selectedType.value === undefined || selectedType.value === "None" || item?.type === selectedType.value)
);
</script>

<template>
	<UiPageSection
		title="Changes"
		description="View the changes made to this brawler over time!"
		orientation="vertical"
		class="space-y-2! divide-y-0!"
	>
		<div class="flex flex-col gap-4 pt-0!">
			<div class="flex justify-end">
				<USelect
					v-model="selectedType"
					:items="['None', 'Buff', 'Nerf', 'Neutral']"
					class="w-36"
					placeholder="Filter by type"
					:disabled="!items.length && selectedType === undefined"
				/>
			</div>
			<div v-if="!items.length" class="text-center text-neutral-500 dark:text-neutral-400">No changes found.</div>
			<UAccordion
				v-else
				collapsible
				type="multiple"
				multiple
				:items="items as AccordionItem[]"
				:default-value="items.map((i) => i?.value) as string[]"
			>
				<template #default="{ item, index }">
					<span class="truncate">{{ index + 1 }}. {{ item.label }}</span>
				</template>
				<template #item="{ item }">
					<p class="px-2 text-black dark:text-neutral-300">{{ (item as any).content }}</p>
				</template>
				<template #leading="{ item }">
					<NuxtImg
						:src="
							(item as any).type === 'Buff'
								? '/icons/changes/buff.webp'
								: (item as any).type === 'Nerf'
									? '/icons/changes/nerf.webp'
									: '/icons/changes/neutral.webp'
						"
						width="25"
						height="25"
					/>
				</template>

				<template #trailing="{ open }">
					<UIcon
						name="i-heroicons-chevron-right-20-solid"
						class="ms-auto h-5 w-5 transform transition-transform duration-200"
						:class="[open && 'rotate-90']"
					/>
				</template>
			</UAccordion>
		</div>
	</UiPageSection>
</template>
