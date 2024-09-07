<script lang="ts" setup>
import { Label } from "radix-vue";
import { cn } from "$lib/util/tailwind";
import { useFormField } from "./use-form-field";

const { error, formItemId } = useFormField();
</script>

<template>
	<Label
		:class="
			cn(
				'block text-left text-sm font-medium tracking-tight text-foreground',
				error && 'text-destructive',
				$attrs.class ?? ''
			)
		"
		:for="formItemId"
	>
		<slot />
	</Label>
</template>
