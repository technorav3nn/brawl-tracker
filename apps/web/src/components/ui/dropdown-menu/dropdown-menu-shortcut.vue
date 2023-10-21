<script setup lang="ts">
import { cn } from "$lib/util/tailwind";
</script>

<template>
	<span :class="cn('ml-auto text-xs tracking-widest opacity-60', $attrs.class ?? '')">
		<slot />
	</span>
</template>
