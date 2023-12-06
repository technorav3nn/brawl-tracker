<script setup lang="ts">
import { Image } from "@unpic/vue";
import { format } from "date-fns";
import { Clock, Dices } from "lucide-vue-next";
import { secondsToDate } from "$lib/util/common";

const route = useRoute("maps-map");
const { data: map } = await useFetch(`/api/maps/${route.params.map}`);
const { data: events } = await useFetch(`/api/events/rotation`);

if (!map || !map.value) {
	throw createError({ statusCode: 404, statusMessage: `Map not found: ID ${route.params.map}` });
}

const activeEvents = computed(() => events.value?.active);
const mapIsActive = computed(() => activeEvents.value?.find((event) => event.map.name === map.value!.name));
</script>

<template>
	<div v-if="map">
		<div class="flex flex-row gap-4">
			<Image
				:src="map.gameMode.imageUrl"
				priority
				width="80"
				height="80"
				class="self-center bg-contain !object-contain"
			/>
			<div class="flex flex-col">
				<h2 class="text-3xl font-bold tracking-tight">
					{{ map.name }}
				</h2>
				<p class="flex flex-row items-center gap-1.5 text-muted-foreground">
					<Dices class="h-4 w-4 text-muted-foreground" />
					{{ map.gameMode.name }}
				</p>
				<p class="flex flex-row items-center gap-1.5 text-muted-foreground">
					<Clock class="h-4 w-4 text-muted-foreground" />
					<template v-if="!mapIsActive">
						Last seen {{ format(secondsToDate(map.lastActive), "d'd' k'h' 'ago'") }}
					</template>
					<template v-else>Currently in rotation</template>
				</p>
			</div>
		</div>
		<!--
 <div class="flex flex-row items-center gap-2.5 text-4xl font-bold leading-normal tracking-tight">
			<NuxtImg
				:src="map.gameMode.imageUrl"
				priority
				width="40"
				height="45"
				fit="contain"
				class="self-center bg-contain object-contain"
			/>
			{{ map.name }}
		</div>
		<p class="text-md mb-4 text-muted-foreground">
			{{ map.gameMode.name }}
		</p>
		<div class="flex flex-row gap-2">
			<UiBadge v-if="!mapIsActive">
				Last seen {{ format(secondsToDate(map.lastActive), "d'd' k'h' 'ago'") }}
			</UiBadge>
			<UiBadge v-else variant="destructive"> Active </UiBadge>
			<UiBadge>Concept by {{ map.credit }}</UiBadge>
		</div> 
-->
	</div>
</template>
