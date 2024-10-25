<script setup lang="ts">
const pin = ref<number | null>(null);
</script>

<template>
	Page used for testing stuff
	<br />
	<UiPinInput format="###-###" otp @completed="pin = $event" />
	{{ pin }}
</template>
