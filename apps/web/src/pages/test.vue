<script setup lang="ts">
const tag = ref("29JVY92QC");
const { data: club, status } = useLazyQuery(clubsDetailQuery(tag.value));
</script>

<template>
	<p v-if="status === 'pending'">Loading...</p>
	<p v-else>data loaded: {{ club?.name }}</p>
</template>
