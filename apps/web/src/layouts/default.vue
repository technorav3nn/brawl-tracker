<script setup>
defineOptions({ inheritAttrs: false });
</script>

<template>
	<div class="flex h-screen min-h-[100vh] flex-col font-sans">
		<SectionsHeader />
		<div class="mt-8 flex-auto justify-between">
			<div class="w-full">
				<main class="mx-auto w-5/6 pb-10 max-sm:w-11/12 lg:max-w-5xl" v-bind="$attrs">
					<slot />
				</main>
			</div>
		</div>
		<SectionsFooter />
	</div>
</template>
