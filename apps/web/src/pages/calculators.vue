<script setup lang="ts">
const route = useRoute("calculators");

const CALCULATORS = [
	{
		name: "Maxed Brawler Price",
		path: "brawler-maxed-price",
	},
];
const tab = ref(route.path.split("/")[2]!);

watchEffect(() => {
	tab.value = route.path.split("/")[2]!;
	useLoadingIndicator().finish();
});
</script>

<template>
	<div>
		<h1 class="text-4xl font-bold leading-normal tracking-tight">Calculators</h1>
		<p class="text-md mb-5 text-muted-foreground">Different calculators and utilites for Brawl Stars</p>
		<UiTabs v-model:modelValue="tab">
			<UiTabsList>
				<UiTabsTrigger v-for="calculator in CALCULATORS" :key="calculator.path" :value="calculator.path">
					<NuxtLink :to="`/calculators/${calculator.path}`">{{ calculator.name }}</NuxtLink>
				</UiTabsTrigger>
			</UiTabsList>
		</UiTabs>
		<div class="px-1 pt-4">
			<div class="grid-media-cols grid gap-4">
				<NuxtPage />
			</div>
		</div>
	</div>
</template>
