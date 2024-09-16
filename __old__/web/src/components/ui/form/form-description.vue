<script lang="ts" setup>
import { cn } from "$lib/util/tailwind";
import { useFormField } from "./use-form-field";

const { formDescriptionId } = useFormField();
</script>

<template>
	<p :id="formDescriptionId" :class="cn('text-[0.8rem] text-muted-foreground', $attrs.class ?? '')">
		<slot />
	</p>
</template>
