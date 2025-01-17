<script setup lang="ts">
import { Image } from "@unpic/vue";
import { ModalsMapViewerModal } from "#components";

const {
	params: { map: mapId },
} = useRoute("maps-map");

const { data: map } = await useFetch(`/api/maps/${mapId}`);
const modal = useModal();

function openMapViewer() {
	modal.open(ModalsMapViewerModal, { imageUrl: map.value!.imageUrl });
}
</script>

<template>
	<UContainer>
		<UPage>
			<UPageBody class="!mt-8">
				<div class="flex justify-center items-center">
					<UCard :ui="{ body: { padding: '!p-0' } }" class="min-w-56">
						<div class="flex flex-row gap-0 flex-nowrap">
							<NuxtImg
								:src="map!.imageUrl"
								:alt="map!.name"
								class="rounded rounded-r-none"
								width="180"
								:modifiers="map!.gameMode.name === 'Brawl Ball' ? { extract: '85_132_500_785' } : { trim: '{}' }"
								height="250"
								loading="lazy"
							/>
							<div class="p-3.5 flex flex-col items-start justify-between">
								<div class="flex gap-2 items-center">
									<Image :src="map!.gameMode.imageUrl" :alt="map!.name" class="!object-scale-down" width="32" height="32" />
									<div class="flex flex-col">
										<h1 class="text-md font-semibold">{{ map!.name }}</h1>
										<p class="text-sm">{{ map!.gameMode.name }}</p>
									</div>
								</div>
								<div class="flex gap-2.5 flex-col w-full">
									<div class="flex flex-col">
										<p class="text-sm">
											Concept by: <span class="font-semibold">{{ map?.credit ?? "BS Devs" }}</span>
										</p>
										<p class="text-sm">
											Disabled: <span class="font-semibold">{{ map?.disabled ? "Yes" : "No" }}</span>
										</p>
										<p class="text-sm">
											Last Seen:
											<span class="font-semibold">{{ map?.lastActive ? new Date(map.lastActive).toDateString() : "???" }}</span>
										</p>
									</div>
									<UButton icon="i-heroicons-magnifying-glass-plus-20-solid" block @click="openMapViewer">View Map</UButton>
								</div>
							</div>
						</div>
					</UCard>
				</div>
			</UPageBody>
		</UPage>
	</UContainer>
</template>
