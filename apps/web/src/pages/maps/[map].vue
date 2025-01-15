<script setup lang="ts">
const {
	params: { map: mapId },
} = useRoute("maps-map");

const { data: map } = await useFetch(`/api/maps/${mapId}`);
</script>

<template>
	<UContainer>
		<UPage>
			<UPageBody class="!mt-8">
				<div class="flex justify-center items-center">
					<UCard class="w-min" :ui="{ body: { base: '!p-0' }, header: { padding: 'px-4 py-3 sm:px-4' } }">
						<template #header>
							<div class="flex gap-2 items-center">
								<NuxtImg :src="map!.gameMode.imageUrl" :alt="map!.name" class="object-scale-down" width="30" height="30" />
								<h1 class="text-md lg:text-md font-semibold truncate">{{ map!.name }}</h1>
							</div>
						</template>
						<div class="flex items-center justify-center h-full mx-auto">
							<NuxtImg
								:src="map!.imageUrl"
								:alt="map!.name"
								class="w-full rounded-b-lg"
								width="200"
								:modifiers="map!.gameMode.name === 'Brawl Ball' ? { extract: '85_132_500_785' } : { trim: '{}' }"
								:height="map!.gameMode.name.includes('Showdown') ? 300 : 300"
								loading="lazy"
							/>
						</div>
					</UCard>
				</div>
			</UPageBody>
		</UPage>
	</UContainer>
</template>
