<script setup lang="ts">
import "$assets/css/global.css";

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

<template>
	<AppHeader />
	<UMain>
		<NuxtLayout>
			<NuxtLoadingIndicator
				v-if="indicatorState"
				:throttle="380"
				color="repeating-linear-gradient(to right, rgb(var(--color-primary-DEFAULT)) 0%, var(--primary-lighter) 50%, var(--primary-light) 100%)"
			/>
			<NuxtPage />
		</NuxtLayout>
	</UMain>
	<AppFooter />
	<UNotifications />
	<UModals />
	<USlideovers />
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
