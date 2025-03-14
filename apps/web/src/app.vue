<script setup lang="ts">
const indicatorState = useLoadingIndicatorState();

const router = useRouter();
router.afterEach(() => {
	indicatorState.value = true;
});

const colorMode = useColorMode();
const color = computed(() => (colorMode.value === "dark" ? "#020420" : "white"));
useHead({
	titleTemplate: "%s · BrawlTrack",
	meta: [{ name: "theme-color", content: color.value }],
	title: "BrawlTrack - Brawl Stars Stats",
});
</script>
<!-- color="repeating-linear-gradient(to right, rgb(var(--color-primary-DEFAULT)) 0%, var(--primary-lighter) 50%, var(--primary-light) 100%)" -->

<template>
	<UApp>
		<AppHeader />
		<UMain>
			<NuxtLayout>
				<NuxtLoadingIndicator color="red" class="bg-gradient-to-r! from-(--ui-primary)! to-primary-500" :throttle="380" />
				<NuxtPage />
			</NuxtLayout>
		</UMain>
		<AppFooter />
	</UApp>
</template>

<style global>
:root {
	--primary-lighter: color-mix(in srgb, rgb(var(--color-primary-DEFAULT)) 80%, white);
	--primary-light: color-mix(in srgb, rgb(var(--color-primary-DEFAULT)) 60%, white);
	--primary: var(--color-primary-DEFAULT);
}

.unovis-xy-container {
	--vis-crosshair-line-stroke-color: rgb(var(--color-primary-500));
	--vis-crosshair-circle-stroke-color: #fff;

	--vis-axis-grid-color: rgb(var(--color-gray-200));
	--vis-axis-tick-color: rgb(var(--color-gray-200));
	--vis-axis-tick-label-color: rgb(var(--color-gray-400));

	--vis-tooltip-background-color: #fff;
	--vis-tooltip-border-color: rgb(var(--color-gray-200));
	--vis-tooltip-text-color: rgb(var(--color-gray-900));
}

.dark {
	.unovis-xy-container {
		--vis-crosshair-line-stroke-color: rgb(var(--color-primary-400));
		--vis-crosshair-circle-stroke-color: rgb(var(--color-gray-900));

		--vis-axis-grid-color: rgb(var(--color-gray-800));
		--vis-axis-tick-color: rgb(var(--color-gray-800));
		--vis-axis-tick-label-color: rgb(var(--color-gray-500));

		--vis-tooltip-background-color: rgb(var(--color-gray-900));
		--vis-tooltip-border-color: rgb(var(--color-gray-800));
		--vis-tooltip-text-color: #fff;
	}
}
</style>
