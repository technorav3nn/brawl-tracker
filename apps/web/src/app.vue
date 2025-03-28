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

const nuxt = useNuxtApp();
</script>
<!-- color="repeating-linear-gradient(to right, rgb(var(--color-primary-DEFAULT)) 0%, var(--primary-lighter) 50%, var(--primary-light) 100%)" -->

<template>
	<Teleport to="#teleports">
		<NuxtLoadingIndicator color="red" class="bg-gradient-to-r! from-(--ui-primary)! to-primary-500" :throttle="380" />
	</Teleport>
	<UApp>
		<AppHeader />
		<UMain>
			<NuxtLayout>
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
	--vis-crosshair-line-stroke-color: var(--ui-color-primary-500);
	--vis-crosshair-circle-stroke-color: #fff;

	--vis-axis-grid-color: var(--ui-color-neutral-200);
	--vis-axis-tick-color: var(--ui-color-neutral-200);
	--vis-axis-tick-label-color: var(--ui-color-neutral-400);

	--vis-tooltip-background-color: #fff;
	--vis-tooltip-border-color: var(--ui-color-neutral-200);
	--vis-tooltip-text-color: var(--ui-color-neutral-900);
}

.dark {
	.unovis-xy-container {
		--vis-crosshair-line-stroke-color: var(--ui-color-primary-400);
		--vis-crosshair-circle-stroke-color: var(--ui-color-neutral-900);

		--vis-axis-grid-color: var(--ui-color-neutral-800);
		--vis-axis-tick-color: var(--ui-color-neutral-800);
		--vis-axis-tick-label-color: var(--ui-color-neutral-500);

		--vis-tooltip-background-color: var(--ui-color-neutral-900);
		--vis-tooltip-border-color: var(--ui-color-neutral-800);
		--vis-tooltip-text-color: #fff;
	}
}
</style>
