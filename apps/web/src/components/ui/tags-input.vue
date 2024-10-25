<script setup lang="ts">
/* eslint-disable @typescript-eslint/no-use-before-define */
import { verifyTag } from "@brawltracker/supercell-api-utils";
import * as tagsInput from "@zag-js/tags-input";
import { normalizeProps, useMachine } from "@zag-js/vue";
import { input } from "#ui/ui.config";

const props = defineProps<{
	gameTagInputType: "club" | "player";
	name: string;
}>();

const name = computed(() => props.name);

const [model] = defineModel<string[]>();

const toast = useToast();
const stopLoop = ref(false);
const oldTags = ref<string[]>([]);
const loading = ref(false);

const [state, send] = useMachine(
	tagsInput.machine({
		id: useId(),
		name: name.value,
		value: model.value,
		editable: false,
		validate({ inputValue, value }) {
			if (!props.gameTagInputType) return true;
			if (!verifyTag(inputValue)) {
				toast.add({
					title: "Invalid Tag",
					description: "Please enter a valid tag.",
					color: "red",
					icon: "i-heroicons-exclamation-circle-20-solid",
				});
				return false;
			}

			if (value.some((t) => t.includes(inputValue))) {
				toast.add({
					title: "Duplicate Tag",
					description: "You already have this tag.",
					color: "red",
					icon: "i-heroicons-exclamation-circle-20-solid",
				});
				return false;
			}

			return true;
		},
		async onValueChange({ value }) {
			model.value = value;
			if (!props.gameTagInputType) return;
			if (stopLoop.value && oldTags.value === value) {
				stopLoop.value = false;
				return;
			}

			for (const [_, v] of value.entries()) {
				if (!verifyTag(v)) continue;
				if (props.gameTagInputType === "player") {
					loading.value = true;
					try {
						oldTags.value = value;
						const player = await $fetch(`/api/players/${encodeURIComponent(v)}`);
						const newTags = [...api.value.value, `${v} - ${player.name}`].filter((t) => t !== v);
						api.value.setValue(newTags);
					} catch {
						toast.add({
							title: "Player Not Found",
							description: "Please enter a valid player tag.",
							color: "red",
							icon: "i-heroicons-exclamation-circle-20-solid",
						});
						api.value.setValue(api.value.value.filter((t) => t !== v));
					}

					loading.value = false;
				} else {
					loading.value = true;
					try {
						oldTags.value = value;
						const club = await $fetch(`/api/club/${encodeURIComponent(v)}`);
						const newTags = [...api.value.value, `${v} - ${club.name}`].filter((t) => t !== v);
						api.value.setValue(newTags);
					} catch {
						toast.add({
							title: "Club Not Found",
							description: "Please enter a valid club tag.",
							color: "red",
							icon: "i-heroicons-exclamation-circle-20-solid",
						});
						api.value.setValue(api.value.value.filter((t) => t !== v));
					}

					loading.value = false;
				}

				stopLoop.value = true;
			}
		},
	})
);
const itemInputRefs = ref<HTMLInputElement[] | []>([]);
const api = computed(() => tagsInput.connect(state.value, send, normalizeProps));

function getItemDeleteTriggerProps({ index, value }: { index: number; value: string }) {
	const triggerProps = api.value.getItemDeleteTriggerProps({ index, value });

	if (props.gameTagInputType) {
		triggerProps.onClick = (event: MouseEvent) => {
			if (!(event.target as HTMLButtonElement).id.includes("0:delete-btn")) {
				send({ type: "CLICK_DELETE_TAG", id: (event.target as HTMLButtonElement).parentElement?.id });
				return;
			}

			return toast.add({
				title: "Cannot Delete Tag",
				description: "Cannot delete your own tag!",
				color: "red",
				icon: "i-heroicons-exclamation-circle-20-solid",
			});
		};
	}

	return triggerProps;
}
</script>

<template>
	<div
		ref="ref"
		v-bind="api.getRootProps()"
		class="relative block w-full disabled:cursor-not-allowed disabled:opacity-75 focus:outline-none border-0 form-input rounded-md placeholder-gray-400 dark:placeholder-gray-500 text-sm px-3 py-2 shadow-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400"
	>
		<div class="flex flex-row flex-wrap gap-2 items-center rounded-lg w-full">
			<span v-for="(value, index) in api.value" :key="index" v-bind="api.getItemProps({ index, value })">
				<UBadge
					color="white"
					class="h-7 flex gap-1 pr-1.5 data-[highlighted]:!bg-primary data-[highlighted]:!text-background data-[highlighted]:!ring-0 group [&[hidden]]:hidden"
					v-bind="api.getItemPreviewProps({ index, value })"
				>
					<span>{{ value }} </span>
					<button
						type="button"
						v-bind="getItemDeleteTriggerProps({ index, value })"
						class="hover:bg-gray-700 rounded px-[0.20rem] flex items-center justify-center group-data-[highlighted]:hover:bg-transparent/15"
					>
						&#x2715;
					</button>
				</UBadge>
				<input v-bind="api.getItemInputProps({ index, value })" ref="itemInputRefs" class="h-7 focus:outline-none" />
			</span>
			<input v-show="!loading" placeholder="Add tag..." v-bind="api.getInputProps()" class="bg-transparent focus:outline-none" />

			<div v-show="loading" class="flex items-center gap-1">
				<UIcon
					v-show="loading"
					name="i-heroicons-arrow-path-20-solid"
					class="animate-spin text-gray-400 dark:text-gray-500 h-5 w-5"
				/>
				<span class="text-gray-400 dark:text-gray-500">Loading...</span>
			</div>
		</div>
		<input v-bind="api.getHiddenInputProps()" />
	</div>
</template>
