<script setup>
defineOptions({ inheritAttrs: false });
</script>

<template>
	<div class="flex h-screen min-h-[100vh] flex-col font-sans">
		<SectionsHeader />
		<div class="mt-24 flex-auto justify-between">
			<div class="w-full">
				<main class="mx-auto w-5/6 pb-10" v-bind="$attrs">
					<slot />
				</main>
			</div>
		</div>
		<SectionsFooter />
	</div>
</template>
