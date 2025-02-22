<script setup lang="ts">
import "$assets/css/global.css";

const indicatorState = useLoadingIndicatorState();

const router = useRouter();
router.afterEach(() => {
	indicatorState.value = true;
});
</script>

<template>
	<AppHeader />
	<UMain>
		<NuxtLayout>
			<NuxtLoadingIndicator
				v-if="indicatorState"
				color="repeating-linear-gradient(to right,rgb(var(--color-primary-DEFAULT)) 0%,#34cdfe 50%,#0047e1 100%)"
				:throttle="150"
			/>
			<NuxtPage />
		</NuxtLayout>
	</UMain>
	<AppFooter />
	<UNotifications />
	<UModals />
	<USlideovers />
</template>
