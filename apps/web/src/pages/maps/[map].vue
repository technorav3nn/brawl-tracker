<script setup lang="ts">
const route = useRoute("maps-map");
const { data: map } = await useFetch(`/api/maps/${route.params.map}`);

if (!map.value) {
	throw createError({ statusCode: 404, statusMessage: `Map not found: ID ${route.params.map}` });
}
</script>

<template>
	<div>
		<h1 class="text-4xl font-bold leading-normal tracking-tight">
			{{ map!.name }}
		</h1>
		<p class="text-md mb-5 text-muted-foreground">
			{{ map!.disabled }}
		</p>
	</div>
</template>
