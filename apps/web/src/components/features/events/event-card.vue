<script setup lang="ts">
import type { BrawlApiEvent } from "@brawltracker/brawl-api";
import { CDN_URL_V2 } from "@brawltracker/cdn/v2";
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
	"cursor-pointer hover:ring-2 hover:ring-primary-500 dark:hover:ring-primary-400 hover:bg-neutral-100/50 dark:hover:bg-neutral-800/50";

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
	<UCard
		ref="target"
		:ui="{ header: 'p-0!', body: 'py-2! px-4! has-[section]:h-full', footer: 'py-1.5! px-2!' }"
		:class="!showMenu ? HOVER_CLASS : ''"
		@click="onCardClick"
	>
		<!-- Menu open -->
		<template v-if="showMenu" #header>
			<NuxtImg
				:src="event.map?.environment ? event.map.environment.imageUrl : '/placeholder.webp'"
				:alt="event.map.name"
				loading="lazy"
				height="100"
				width="500"
				class="h-full w-full rounded-t-lg object-cover object-top brightness-50 filter"
				format="webp"
				:placeholder
			/>
		</template>
		<section v-if="showMenu">
			<div class="mt-1.5 flex h-full items-center justify-center gap-2">
				<UButton variant="subtle" :to="`/maps/${event.map.id}`" class="flex w-[49%] items-center justify-center"
					>View Map</UButton
				>
				<UButton variant="subtle" :to="`/modes/${event.map.gameMode.id}`" class="flex w-[49%] items-center justify-center"
					>View Mode</UButton
				>
			</div>
			<UButton icon="i-heroicons-arrow-left-20-solid" block class="mt-2 gap-2" color="neutral" variant="subtle">Go Back</UButton>
		</section>

		<!-- Menu not open -->
		<!-- Disable this, because we have an if statement checking it -->
		<!-- eslint-disable-next-line vue/valid-v-slot --->
		<template v-if="!showMenu" #header>
			<NuxtImg
				:id="event.map.id"
				:src="event.map.environment.imageUrl"
				:alt="event.map.name"
				height="110"
				width="500"
				class="h-full w-full rounded-t-lg object-cover object-top"
				format="webp"
			/>
		</template>
		<template v-if="!showMenu" #footer>
			<div class="flex flex-row justify-between">
				<div class="flex gap-1">
					<Image
						v-for="brawler in bestBrawlers"
						:key="brawler.brawler"
						:src="`${CDN_URL_V2}/brawlify/brawlers/borderless/${brawler.brawler}.png`"
						width="25"
						height="25"
						class="size-[25px] rounded"
						format="webp"
						loading="lazy"
						:alt="brawler.brawler.toString()"
					/>
				</div>
				<div class="flex items-center gap-1">
					<UIcon name="i-heroicons-clock" class="inline-block text-neutral-500 dark:text-neutral-400" />
					<p class="inline-block text-sm font-medium text-neutral-500 dark:text-neutral-400">
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
					class="-ml-1.5 h-10 w-10 self-center bg-contain object-contain!"
				/>
				<div class="flex flex-1 flex-col">
					<h1 class="flex flex-row items-center gap-2 text-lg leading-snug font-bold uppercase">
						{{ event.map.gameMode.name }}
						<UIcon v-if="event.slot.name === 'Challenge'" name="i-heroicons-trophy-20-solid" class="text-(--ui-primary)" />
					</h1>
					<div class="flex flex-row justify-between">
						<p class="overflow-hidden text-sm font-medium text-ellipsis whitespace-nowrap text-neutral-500 dark:text-neutral-400">
							{{ event.map.name }}
						</p>
					</div>
				</div>
			</div>
		</template>
	</UCard>
</template>
