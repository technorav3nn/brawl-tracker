<script setup lang="ts">
const { params } = useRoute("clubs-tag");
const { data } = useFetch(`/api/clubs/${params.tag}`);
</script>

<template>
	<p>{{ data }}</p>
</template>
