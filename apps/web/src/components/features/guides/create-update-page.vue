<script setup lang="ts">
import type { FormSubmitEvent } from "@nuxt/ui";
import type { FetchError } from "ofetch";
import type * as z from "zod";
import { LazyModalsConfirmationModal } from "#components";
import { guideSchemaClient } from "$lib/schemas/guides";
import { capitalizeFirstLetter } from "$lib/utils/common";

const props = defineProps<{
	type: "create" | "update";
}>();

const characterCount = ref(0);

const schema = computed(() => guideSchemaClient(characterCount.value));
type Schema = z.infer<typeof schema.value>;

const { id } = useRoute("brawlers-id-guides").params;
const type = computed(() => props.type);
const guideId = computed(() => (type.value === "update" ? useRoute("brawlers-id-guides-guideId").params.guideId : undefined));

const options = computed(() => ({
	...guideById(guideId.value),
	enabled: type.value === "update",
}));

const { data: guide, suspense } = useQuery(options);
if (type.value === "update") await suspense();

const { data: session } = await authClient.useSession(useFetch);
if (type.value === "update" && guide.value && guide.value.authorId !== session.value?.user.id) {
	throw createError({
		statusCode: 403,
		statusMessage: "You are not allowed to update this guide",
	});
}

const state = reactive({
	name: type.value === "update" ? guide.value!.name : "",
	shortDescription: type.value === "update" ? guide.value!.shortDescription : "",
	isInDepth: type.value === "update" ? guide.value!.isInDepth : false,
	editorHtml: type.value === "update" ? guide.value!.editorHtml : "",
});

const programaticLeave = ref(false);

const toast = useToast();
const queryClient = useQueryClient();

async function onSubmit(event: FormSubmitEvent<Schema>) {
	try {
		await $fetch(`/api/guides/${type.value}`, {
			method: type.value === "create" ? "POST" : "PATCH",
			body: { ...event.data, brawlerId: id, guideId: guideId.value },
		});
		toast.add({
			title: `Guide ${type.value === "create" ? "Created" : "Updated"}`,
			description: `Your guide has been ${type.value === "create" ? "created" : "updated"} successfully!`,
			icon: "i-heroicons-check-circle",
			color: "success",
		});
		await queryClient.invalidateQueries({ queryKey: guideKeys.allByBrawler(id) });
		if (type.value === "update") {
			await queryClient.invalidateQueries({ queryKey: guideKeys.id(guideId.value) });
		}

		programaticLeave.value = true;
		return await navigateTo(`/brawlers/${id}/guides`);
	} catch (error) {
		console.log("error", JSON.stringify(error, null, 2));
		if ((error as FetchError).statusCode === 409) {
			toast.add({
				title: "Error",
				description:
					"You are only allowed to have one guide per brawler. Update or delete you existing guide to create a new one",
				icon: "i-heroicons-x-circle",
				color: "error",
				duration: 10_000,
			});
			return;
		}

		console.error(error);
		toast.add({
			title: "Error",
			description: `There was an error ${type.value === "create" ? "creating" : "updating"} your guide. Please try again.`,
			icon: "i-heroicons-x-circle",
			color: "error",
		});
	}
}

const overlays = useOverlay();
const modal = overlays.create(LazyModalsConfirmationModal, {});

const form = useTemplateRef("form");
function beforeUnload(event: BeforeUnloadEvent) {
	event.preventDefault();
	// For Chrome, it's deprecated but it still is required I'm pretty sure
	event.returnValue = "";
}

onMounted(() => {
	window.addEventListener("beforeunload", beforeUnload);
});
onBeforeUnmount(() => {
	window.removeEventListener("beforeunload", beforeUnload);
});

onBeforeRouteLeave((_1, _2, next) => {
	if (form.value?.dirty && !programaticLeave.value) {
		modal.open({
			onSuccess: (state) => {
				window.removeEventListener("beforeunload", beforeUnload);

				if (state) {
					modal.close();
					return next();
				}

				modal.close();
				return next(false);
			},
			labels: ["Cancel", "Leave"],
			description: "Are you sure you want to leave? You have unsaved changes that will be lost if you leave.",
		});
		return;
	}

	return next();
});
</script>

<template>
	<UBreadcrumb
		class="mt-4 -mb-2"
		:items="[
			{
				label: 'Guides',
				to: `/brawlers/${id}/guides`,
				icon: 'i-heroicons-book-open',
			},
			{ label: capitalizeFirstLetter(type), icon: 'i-heroicons-plus-circle' },
		]"
	/>
	<UiPageSection
		:title="type === 'create' ? 'Create a Guide' : 'Update Guide'"
		:description="
			type === 'create'
				? 'Create a guide for your brawler! Make it simple or in-depth, it\'s up to you!'
				: 'Update your own guide and change everything you need!'
		"
		orientation="vertical"
		class="space-y-2!"
		containerClass="pb-3"
	>
		<UForm
			ref="form"
			:state
			class="flex max-w-full flex-col gap-4 !pt-2 lg:flex-row lg:gap-0"
			:schema
			@submit="void onSubmit($event)"
		>
			<div class="flex flex-1 flex-col gap-4">
				<UFormField name="name" label="Name" description="The name of your guide">
					<UInput v-model="state.name" class="w-full sm:max-w-80" placeholder="Name of your guide" />
				</UFormField>

				<UFormField
					name="shortDescription"
					label="Short Description"
					description="A short description of your guide, this will be shown on the guide list."
				>
					<UTextarea
						v-model="state.shortDescription"
						class="w-full sm:max-w-sm"
						placeholder="A short description of your guide"
						:rows="3"
					/>
				</UFormField>

				<UCheckbox
					v-model="state.isInDepth"
					label="In-Depth Guide"
					description="Whether this an in-depth guide or not"
					class="w-full sm:max-w-sm"
					:ui="{ label: 'text-sm', description: 'text-sm' }"
					size="lg"
				/>
			</div>

			<div class="flex flex-1 flex-col gap-4">
				<UFormField
					label="Guide Content"
					description="The content of your guide, feel free to use much formatting as you please!"
					:ui="{ container: 'mt-3' }"
					class="max-w-prose lg:w-full lg:self-end"
				>
					<TiptapRootEditor
						ref="editor"
						v-model:html="state.editorHtml"
						:hasError="!!form?.errors.find((e) => e.name === 'editorHtml')"
						editorClass="h-[300px] overflow-scroll "
						:minimumCharacters="200"
						@update:char-count="characterCount = $event"
					/>
				</UFormField>

				<UButton type="submit" class="w-min! self-start lg:self-end" icon="i-heroicons-pencil-square">
					{{ capitalizeFirstLetter(type) }}
				</UButton>
			</div>
		</UForm>
	</UiPageSection>
</template>
