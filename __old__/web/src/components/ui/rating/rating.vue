<script setup lang="ts">
import { StarIcon } from "lucide-vue-next";

interface RatingProps {
	value: number;
	count: number;
}

const props = withDefaults(defineProps<RatingProps>(), {
	count: 5,
});

defineOptions({
	inheritAttrs: false,
});
</script>

<template>
	<div class="flex items-center gap-2" v-bind="$attrs">
		<template v-for="i in props.count" :key="i">
			<StarIcon
				:class="{
					'text-primary': i <= props.value,
					'text-muted-foreground': i > props.value,
				}"
				:fill="i <= props.value ? 'currentColor' : 'none'"
			/>
		</template>
	</div>
</template>
