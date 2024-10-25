<script setup lang="ts">
import * as pinInput from "@zag-js/pin-input";
import { normalizeProps, useMachine } from "@zag-js/vue";
import { computed } from "vue";

defineProps<{ otp: boolean; format: string }>();

const $emit = defineEmits<{
	completed: [pin: string];
}>();

const parseFormat = (format: string) => {
	const result = [];
	for (const char of format) {
		if (char === "#") {
			result.push("#");
		} else {
			result[result.length - 1] += char;
		}
	}

	return result;
};

const [state, send] = useMachine(
	pinInput.machine({
		id: "2",
		placeholder: "○",
		onValueComplete: (v) => {
			$emit("completed", v.valueAsString);
		},
	})
);
const api = computed(() => pinInput.connect(state.value, send, normalizeProps));
</script>

<template>
	<div ref="ref" v-bind="api.getRootProps()" class="w-min">
		<div v-bind="api.getControlProps()" class="flex items-center flex-row gap-2 mb-2">
			<template v-for="(d, index) in parseFormat(format)" :key="d">
				<input
					v-bind="api.getInputProps({ index })"
					class="w-1/4 h-[70px] !px-0 text-center text-xl disabled:cursor-not-allowed disabled:opacity-75 focus:outline-none border-0 rounded-md placeholder-gray-400 dark:placeholder-gray-500 shadow-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400"
				/>
				<UDivider
					v-if="d.endsWith('-')"
					:ui="{ border: { base: '!border-gray-200 dark:!border-gray-700' } }"
					class="h-5 w-5"
					size="xs"
				/>
				<!--  pb-[0.12rem] -->
			</template>
		</div>
		<UButton block color="gray" @click="api.clearValue">Clear</UButton>
	</div>
</template>

<style scoped></style>
