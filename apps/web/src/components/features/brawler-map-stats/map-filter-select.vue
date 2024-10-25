<script setup lang="ts">
const { data: modes } = await useFetch("/api/modes", { query: { names: true } });
const { data: maps } = await useFetch("/api/maps");

if (!modes.value) {
	throw createError({ statusCode: 404, message: "Modes not found" });
}

const modeNames = computed(() => modes.value!.map((mode) => mode.name));
const environmentNames = computed(() => {
	const environments = new Set<string>();

	for (const map of maps.value!) {
		environments.add(map.environment.name);
	}

	return [...environments];
});

const unmergedOptions = computed(() => [modeNames.value, environmentNames.value]);
const options = computed(() => [...modeNames.value, ...environmentNames.value]);
const lastOptionEach = computed(() => {
	const lastOptions = [];
	for (const arr of unmergedOptions.value) {
		// if the array is the last one, ignore
		if (arr === unmergedOptions.value[unmergedOptions.value.length - 1]) {
			continue;
		}

		lastOptions.push(arr[arr.length - 1]);
	}

	return lastOptions;
});

// type SectionHandler = [(selected: string) => unknown, string[]]

// const sectionHandlers: Record<string, SectionHandler> = {
// 	modes: [() => {},
// };
</script>

<template>
	<USelectMenu :options="options">
		<template #option="{ option }">
			<div
				class="flex w-full flex-col gap-2"
				:class="{
					'!mt-4': lastOptionEach.includes(option),
				}"
			>
				<span>{{ option }}</span>
			</div>
		</template>
	</USelectMenu>
</template>

<style lang="postcss"></style>
