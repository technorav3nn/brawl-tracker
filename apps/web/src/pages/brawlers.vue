<script setup lang="ts">
const { fetchBrawlers } = useBrawlersStore();
const { brawlers, groupingMode } = storeToRefs(useBrawlersStore());

groupingMode.value = "rarity";

await fetchBrawlers();
</script>

<template>
	<div>
		{{ brawlers }}
	</div>
</template>
