<script setup lang="ts">
const { data: events, suspense } = useQuery({
	queryFn: async () => $fetch("/api/players?tag=P800LV"),
	queryKey: ["events"],
	staleTime: 0,
	gcTime: 0,
});

if (import.meta.server) {
	onServerPrefetch(async () => await suspense());
}
</script>

<template>
	<p>data loaded: {{ events?.["3vs3Victories"] }}</p>
</template>
