<script setup lang="ts">
const data = useUser();
const { data: test } = await useDatabaseUser();
</script>

<template>
	<div>
		{{ data!.name }}
		{{ test?.$collectionId }}
	</div>
</template>
