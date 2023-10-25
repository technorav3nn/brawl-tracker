<script setup lang="ts">
import { cn } from '$lib/util/tailwind'

const props = defineProps<{ class?: string }>()
</script>

<template>
  <div
    :class="
      cn(
        'flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2',
        props.class,
      )
    "
  >
    <slot />
  </div>
</template>
