<script setup lang="ts">
import { IconChevronDown, IconChevronRight } from "@tabler/icons-vue";
import { css, cx } from "$styled-system/css";
import { styled } from "$styled-system/jsx";
import { wrap } from "$styled-system/patterns";
import { details } from "$styled-system/recipes";

const tagInfoState = ref(false);
const detailsClasses = details();
</script>

<template>
	<details
		:class="cx(detailsClasses.root, css({ mt: 5, cursor: 'pointer' }))"
		:open="tagInfoState"
		@toggle="tagInfoState = ($event.target as HTMLDetailsElement).open"
	>
		<summary
			:class="
				cx(
					detailsClasses.summary,
					wrap({
						justifyContent: 'flex-start',
						alignItems: 'center',
						gap: 1,
						userSelect: 'none',
					})
				)
			"
		>
			<IconChevronDown v-if="tagInfoState" :size="20" />
			<IconChevronRight v-else :size="20" />
			<styled.p mx="auto">Where is my Tag located?</styled.p>
		</summary>
		<p :class="cx(detailsClasses.content, css({ cursor: 'text' }))">
			<video
				:class="
					css({
						width: '500px',
						height: '300px',
						position: 'relative',
						objectFit: {
							base: 'scale-down',
							lg: 'initial',
						},
					})
				"
				controls
				src="https://brawlstats.com/guide.mp4"
			/>
		</p>
	</details>
</template>
