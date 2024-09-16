<script setup lang="ts"></script>

<template>
	<AppHeader />
	<UMain>
		<NuxtLayout>
			<NuxtLoadingIndicator
				color="repeating-linear-gradient(to right,rgb(var(--color-primary-DEFAULT)) 0%,#34cdfe 50%,#0047e1 100%)"
				:throttle="150"
			/>
			<NuxtPage />
		</NuxtLayout>
	</UMain>
	<AppFooter />
	<UNotifications />
</template>
