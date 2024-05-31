<script setup lang="ts">
import { verifyTag, formatTag } from "@brawltracker/supercell-api-utils";
import { LucideHash, LucideTrash2 } from "lucide-vue-next";
import { z } from "zod";

interface SavedTag {
	tag: string;
	playerName: string;
}

const savedTags = useLocalStorage<SavedTag[]>("savedTags", []);

savedTags.value = [
	{
		tag: "#P800LV",
		playerName: "KairosTime",
	},
	{
		tag: "#8JQV8J",
		playerName: "Lex",
	},
	{
		tag: "#2Y9G8RQ",
		playerName: "Coach Cory",
	},
];

const schema = z.string().min(3).refine(verifyTag, {
	message: "Invalid tag format",
});

const { value: tag, errorMessage, meta } = useField("tag", toTypedSchema(schema));

const fixedTag = computed(() => formatTag(tag.value ?? ""));
</script>

<template>
	<div class="flex flex-col justify-between gap-4 pb-8 md:gap-20 lg:flex-row">
		<div>
			<h1 class="text-6xl font-bold leading-tight tracking-tight text-foreground">Players</h1>
			<p class="text-sm font-medium text-muted-foreground">
				Search for a players profile with their unique tag!
			</p>

			<div class="flex flex-col">
				<div class="mt-4 flex flex-row items-center">
					<div class="relative w-full max-w-sm items-center">
						<UiInput
							id="tag"
							v-model="tag"
							type="text"
							placeholder="Enter a tag... #P800LV"
							class="rounded-r-none pl-[2.2rem]"
						/>
						<span class="absolute inset-y-0 start-0 flex items-center justify-center px-2">
							<LucideHash class="size-5 stroke-[2] text-muted-foreground" />
						</span>
					</div>
					<NuxtLink :to="`/players/${encodeURIComponent(fixedTag)}`">
						<UiButton class="rounded-l-none border-l-0" :disabled="Boolean(errorMessage) || !meta.dirty">
							Search
						</UiButton>
					</NuxtLink>
				</div>
				<p v-if="errorMessage" class="mt-1 text-[0.8rem] font-medium text-destructive">{{ errorMessage }}</p>
				<div class="mt-2 max-w-lg">
					<p class="text-sm font-medium text-muted-foreground">Saved Tags</p>
					<div class="mt-0.5">
						<div
							v-for="{ tag: playerTag, playerName } in savedTags"
							:key="playerTag"
							v-memo="playerTag"
							class="mr-1 mt-1 inline-block"
						>
							<div class="flex flex-row items-center gap-0.5">
								<UiButton variant="secondary" class="h-10 rounded-r-none">
									<div class="flex flex-col">
										<p
											class="overflow-hidden text-ellipsis whitespace-nowrap text-sm font-medium text-foreground"
										>
											{{ playerName }}
										</p>
										<p
											class="overflow-hidden text-ellipsis whitespace-nowrap text-xs font-medium text-muted-foreground"
										>
											{{ playerTag }}
										</p>
									</div>
								</UiButton>
								<UiButton variant="destructive" size="icon" class="-ml-1 h-10 rounded-l-none shadow-none">
									<LucideTrash2 class="inline-block size-4 stroke-[2]" />
								</UiButton>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="pt-2">
			<NuxtImg
				src="/images/brawlstars/hero.webp"
				alt="Brawl Stars"
				width="700"
				height="500"
				class="rounded"
			/>
		</div>
	</div>
</template>
