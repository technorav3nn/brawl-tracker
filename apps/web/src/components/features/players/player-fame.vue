<script setup lang="ts">
import { useMeowApiPlayer } from "./composables";

const { data: player } = useMeowApiPlayer();
</script>

<template>
	<ClientOnly>
		{{ player?.totalFame }}
	</ClientOnly>
</template>
