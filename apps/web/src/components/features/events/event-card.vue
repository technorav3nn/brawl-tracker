<script setup lang="ts">
import type { BrawlApiEvent } from "@brawltracker/brawl-api";
import { Image } from "@unpic/vue";
import { Duration } from "luxon";
import { useEventsStore } from "./events-store";

const props = defineProps<{
	event: BrawlApiEvent;
	type: "active" | "upcoming";
	images: Record<string, { id: number; imageUrl: string }>;
	index: number;
}>();

const HOVER_CLASS =
	"cursor-pointer hover:ring-2 hover:ring-primary-500 dark:hover:ring-primary-400 hover:bg-gray-100/50 dark:hover:bg-gray-800/50";

const { setCurrentMenuOpen } = useEventsStore();
const { currentMenuOpen } = storeToRefs(useEventsStore());

const target = ref(null);

onClickOutside(target, () => {
	if (currentMenuOpen.value === props.index) {
		setCurrentMenuOpen(null);
	}
});

const bestBrawlers = computed(() => props.event.map.stats.slice(0, 5).filter((stat) => Number(stat.brawler) !== 0));
const placeholder = computed(() => (props.event.map.gameMode.name.includes("2v2") ? "/placeholder.webp" : false));

function onCardClick() {
	if (currentMenuOpen.value === props.index) {
		setCurrentMenuOpen(null);
		return;
	}

	setCurrentMenuOpen(props.index);
}

const showMenu = computed(() => currentMenuOpen.value === props.index);

// eslint-disable-next-line vue/no-setup-props-destructure
const date = useState(`event-${props.event.map.id}-${props.event.map.gameMode.id}`, () => {
	let apiDate: string;
	if (props.type === "active") {
		apiDate = props.event.endTime;
	} else {
		apiDate = props.event.startTime;
	}

	return Duration.fromMillis(new Date(apiDate).getTime() - Date.now())
		.toFormat("d'd' h'h' m'm'", { floor: true })
		.replace(/^0d\s|^0m\s|^0h\s/, "");
});
</script>

<template>
	<UPageCard
		ref="target"
		:ui="{ header: { base: '!p-0' }, body: { base: '!py-2 !px-4 has-[section]:h-full' }, footer: { base: '!py-1.5 !px-2' } }"
		:class="!showMenu ? HOVER_CLASS : ''"
		@click="onCardClick"
	>
		<!-- Menu open -->
		<template v-if="showMenu" #header>
			<NuxtImg
				:src="event.map.environment.imageUrl"
				:alt="event.map.name"
				loading="lazy"
				height="100"
				width="500"
				class="h-full w-full object-cover object-top rounded-t-lg filter brightness-50"
				format="webp"
				:placeholder
			/>
		</template>
		<section v-if="showMenu">
			<div class="flex h-full gap-2 items-center justify-center mt-1.5">
				<UButton :to="`/maps/${event.map.id}`" class="w-[49%] flex justify-center items-center">View Map</UButton>
				<UButton :to="`/modes/${event.map.gameMode.id}`" class="w-[49%] flex justify-center items-center">View Mode</UButton>
			</div>
			<UButton icon="i-heroicons-arrow-left-20-solid" block class="mt-2 gap-2" color="gray">Go Back</UButton>
		</section>

		<!-- Menu not open -->
		<template v-if="!showMenu" #header>
			<NuxtImg
				:src="event.map.environment.imageUrl"
				:alt="event.map.name"
				height="100"
				width="500"
				class="h-full w-full object-cover object-top rounded-t-lg"
				format="webp"
				:placeholder
			/>
		</template>
		<template v-if="!showMenu" #footer>
			<div class="flex flex-row justify-between">
				<div class="flex gap-1">
					<NuxtImg
						v-for="brawler in bestBrawlers"
						:src="images![brawler.brawler].imageUrl"
						width="25"
						height="25"
						class="rounded-md"
						format="webp"
						loading="lazy"
					/>
				</div>
				<div class="flex items-center gap-1">
					<UIcon name="i-heroicons-clock" class="text-gray-500 dark:text-gray-400 inline-block" />
					<p class="text-sm font-medium text-gray-500 dark:text-gray-400 inline-block">
						{{ type === "upcoming" ? "starts" : "ends" }} in
						<span>
							{{ date }}
						</span>
					</p>
				</div>
			</div>
		</template>
		<template v-if="!showMenu" #default>
			<div class="flex w-full flex-row justify-start gap-2">
				<Image
					:src="event.map.gameMode.imageUrl"
					loading="lazy"
					width="40"
					height="40"
					class="-ml-1.5 h-10 w-10 self-center bg-contain !object-contain"
				/>
				<div class="flex flex-1 flex-col">
					<h1 class="flex flex-row items-center gap-2 text-lg font-bold uppercase leading-snug">
						{{ event.map.gameMode.name }}
						<UIcon v-if="event.slot.name === 'Challenge'" name="i-heroicons-trophy-20-solid" />
					</h1>
					<div class="flex flex-row justify-between">
						<p class="overflow-hidden text-ellipsis whitespace-nowrap text-sm font-medium text-gray-500 dark:text-gray-400">
							{{ event.map.name }}
						</p>
					</div>
				</div>
			</div>
		</template>
	</UPageCard>
</template>
