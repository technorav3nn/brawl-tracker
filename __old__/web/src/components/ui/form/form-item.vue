<!-- eslint-disable import/order -->
<script lang="ts">
import { useId } from "radix-vue";
import { type InjectionKey, provide } from "vue";

export const FORM_ITEM_INJECTION_KEY = Symbol("Form Injection Key") as InjectionKey<string>;
</script>

<script lang="ts" setup>
// eslint-disable-next-line import/first
import { cn } from "$lib/util/tailwind";

const id = useId();
provide(FORM_ITEM_INJECTION_KEY, id);
</script>

<template>
	<div :class="cn('space-y-2', $attrs.class ?? '')">
		<slot />
	</div>
</template>
