<script lang="ts" setup>
import { useFormField } from "./use-form-field";
import { cn } from "$lib/util/tailwind";

const { formDescriptionId } = useFormField();
</script>

<template>
	<p :id="formDescriptionId" :class="cn('text-[0.8rem] text-muted-foreground', $attrs.class ?? '')">
		<slot />
	</p>
</template>
