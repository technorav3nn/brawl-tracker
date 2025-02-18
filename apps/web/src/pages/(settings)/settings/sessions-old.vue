<script setup lang="ts">
import { ModalsConfirmationModal } from "#components";
import { getCountryFlagEmoji } from "$lib/utils/common";
import { createGetCachedData } from "$lib/utils/nuxt";

const nuxtApp = useNuxtApp();
const { data: sessions } = await useFetch("/api/auth/sessions", {
	getCachedData: createGetCachedData(nuxtApp),
});
const columns = [
	{ key: "ipCountry", label: "Country", class: "md:!min-w-[100px]" },
	{ key: "expiresAt", label: "Expires At" },
	{ key: "fresh", label: "Fresh", class: "md:!min-w-[100px]" },
	{ key: "currentSession", label: "Current Session", class: "md:whitespace-nowrap" },
	{ key: "actions", label: "Actions", class: "md:!min-w-[100px] md:text-center" },
];

const modal = useModal();

type SessionsType<T = typeof sessions> = T extends Ref<infer U> ? (U extends (infer K)[] ? K : never) : never;

const items = (_row: SessionsType) => [
	[
		{
			label: "Delete",
			icon: "i-heroicons-trash-20-solid",
			click: () => {
				modal.open(ModalsConfirmationModal, {
					labels: ["Cancel", "Delete"],
					description: "Are you sure you want to delete this session?",
				});
			},
		},
	],
];
</script>

<template>
	<section>
		<p class="font-medium text-lg">Sessions</p>
		<p class="text-sm">Manage where you're logged in</p>
		<UDivider class="mt-4 w-full" />
	</section>
	<section class="mt-4">
		<UTable
			v-if="sessions"
			class="border border-gray-200 dark:border-gray-800 rounded-lg h-max"
			:ui="{
				divide: 'dark:!divide-gray-800',
				base: 'md:!whitespace-normal md:!break-words md:w-full md:overflow-hidden',
				td: {
					base: '',
				},
				tr: {
					// make the entire table wrap instead of it overflowing and creating a horizontal scrollbar
					base: '!break-words',
				},
			}"
			:rows="sessions"
			:columns="columns"
		>
			<template #ipCountry-data="{ row }">
				<div class="flex items-center">
					<span class="mr-1.5 text-2xl">{{ getCountryFlagEmoji(row.ipCountry) }}</span>
					<span>{{ row.ipCountry }}</span>
				</div>
			</template>

			<template #fresh-data="{ row }">
				<UBadge :color="row.fresh ? 'green' : 'red'" variant="subtle">{{ row.fresh ? "Yes" : "No" }}</UBadge>
			</template>

			<template #expiresAt-data="{ row }">
				<NuxtTime :datetime="new Date(row.expiresAt)" dateStyle="full" timeStyle="short" />
			</template>

			<template #currentSession-data="{ row }">
				<UBadge :color="row.currentSession ? 'green' : 'red'" variant="subtle">{{ row.currentSession ? "Yes" : "No" }}</UBadge>
			</template>

			<template #actions-data="{ row }">
				<div class="flex items-center justify-center">
					<UDropdown :items="items(row)">
						<UButton color="gray" variant="ghost" icon="i-heroicons-ellipsis-horizontal-20-solid" />
					</UDropdown>
				</div>
			</template>
		</UTable>
	</section>
</template>
