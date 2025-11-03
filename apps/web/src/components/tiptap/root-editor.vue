<script setup lang="ts">
import type { DropdownMenuItem } from "@nuxt/ui";
import { CharacterCount } from "@tiptap/extension-character-count";
import type { Level } from "@tiptap/extension-heading";
import { Link } from "@tiptap/extension-link";
import { TaskItem } from "@tiptap/extension-task-item";
import { TaskList } from "@tiptap/extension-task-list";
import { TextAlign } from "@tiptap/extension-text-align";
import { Youtube } from "@tiptap/extension-youtube";
import StarterKit from "@tiptap/starter-kit";
import { EditorContent, useEditor, type Content } from "@tiptap/vue-3";

const props = defineProps<{ editorClass?: string; hasError?: boolean; minimumCharacters?: number }>();
const emit = defineEmits<{
	"update:charCount": [number];
}>();
const html = defineModel<string>("html");

const characterCount = ref(0);
const percentage = computed(() => {
	if (!props.minimumCharacters) return 0;
	return Math.round((characterCount.value / props.minimumCharacters) * 100);
});

const editor = useEditor({
	extensions: [
		TaskList,
		TaskItem.configure({
			nested: true,
			HTMLAttributes: {
				class: "not-prose",
			},
		}),
		Link,
		TextAlign.configure({ types: ["heading", "paragraph"] }),
		Youtube,
		CharacterCount,
		StarterKit,
	],
	editorProps: {
		attributes: {
			class:
				"prose max-w-full prose-p:my-0 prose-img:my-1 prose-headings:my-1 prose-pre:my-0 prose-table:my-0 prose-blockquote:my-0 prose-ul:-my-0 prose-ol:-my-0 prose-li:-my-0 whitespace-pre-line; dark:prose-invert prose-zinc m-5 focus:outline-none",
		},
	},
	onUpdate: ({ editor }) => {
		html.value = editor.getHTML();
		characterCount.value = editor.storage.characterCount.characters();
		emit("update:charCount", characterCount.value);
	},
	onCreate: ({ editor }) => {
		// console.log(html.value);
		editor?.commands.setContent(html.value as Content);
	},
});

const headingDropdownItems = computed<DropdownMenuItem[]>(() => {
	if (!editor.value) return [];
	const headings: DropdownMenuItem[] = ([1, 2, 3, 4] as Level[]).map((level) => ({
		label: `Heading ${level}`,
		icon: `i-lucide-heading-${level}`,
		color: editor.value?.isActive("heading", { level }) ? "primary" : "neutral",
		active: editor.value?.isActive("heading", { level }),
		onSelect: () => {
			editor.value?.chain().focus().toggleHeading({ level }).run();
		},
		disabled: !editor.value?.can().chain().focus().toggleHeading({ level }).run(),
	}));
	return headings;
});

const listDropdownItems = computed<DropdownMenuItem[]>(() => {
	if (!editor.value) return [];
	const lists: DropdownMenuItem[] = [
		{
			label: "Bullet List",
			icon: "i-lucide-list",
			color: editor.value?.isActive("bulletList") ? "primary" : "neutral",
			active: editor.value?.isActive("bulletList"),
			onSelect: () => {
				editor.value?.chain().focus().toggleBulletList().run();
			},
		},
		{
			label: "Ordered List",
			icon: "i-lucide-list-ordered",
			color: editor.value?.isActive("orderedList") ? "primary" : "neutral",
			active: editor.value?.isActive("orderedList"),
			onSelect: () => {
				editor.value?.chain().focus().toggleOrderedList().run();
			},
		},
		{
			label: "Task List",
			icon: "i-lucide-list-check",
			color: editor.value?.isActive("taskList") ? "primary" : "neutral",
			active: editor.value?.isActive("taskList"),
			onSelect: () => {
				editor.value?.chain().focus().toggleList("taskList", "listItem").run();
			},
		},
	];
	return lists;
});

const linkInfo = reactive({
	displayText: "",
	href: "",
	openInNewTab: false,
});
const linkDialogOpen = ref(false);
const youtubeDialogOpen = ref(false);

onBeforeUnmount(() => {
	if (editor.value) unref(editor)?.destroy();
});
</script>

<template>
	<div>
		<UCard
			:ui="{
				root: 'ring-accented divide-accented',
				body: 'p-1! py-0.5!',
				header: 'overflow-scroll gap-1 px-1! py-1! flex items-center h-full! no-scrollbar',
			}"
			:class="[hasError && 'ring-1 ring-error']"
		>
			<template #header>
				<UTooltip text="Undo">
					<UButton
						variant="ghost"
						:disabled="!editor?.can().chain().focus().undo().run()"
						color="neutral"
						icon="i-lucide-corner-up-left"
						class="inline-flex size-8 items-center justify-center [&_>span]:size-4.5"
						@click="editor?.chain().focus().undo().run()"
					/>
				</UTooltip>
				<UTooltip text="Redo">
					<UButton
						variant="ghost"
						:disabled="!editor?.can().chain().focus().undo().run()"
						color="neutral"
						icon="i-lucide-corner-up-right"
						class="inline-flex size-8 items-center justify-center [&_>span]:size-4.5"
						@click="editor?.chain().focus().undo().run()"
					/>
				</UTooltip>

				<USeparator class="h-7 shrink-0" orientation="vertical" />

				<UDropdownMenu :items="headingDropdownItems">
					<UTooltip text="Headings">
						<UButton
							:icon="
								editor?.isActive('heading', { level: 1 })
									? 'i-lucide-heading-1'
									: editor?.isActive('heading', { level: 2 })
										? 'i-lucide-heading-2'
										: editor?.isActive('heading', { level: 3 })
											? 'i-lucide-heading-3'
											: editor?.isActive('heading', { level: 4 })
												? 'i-lucide-heading-4'
												: 'i-lucide-heading'
							"
							trailingIcon="i-lucide-chevron-down"
							:ui="{ trailingIcon: 'size-3', base: 'gap-0' }"
							:variant="editor?.isActive('heading') ? 'soft' : 'ghost'"
							color="neutral"
						/>
					</UTooltip>
				</UDropdownMenu>
				<UDropdownMenu :items="listDropdownItems">
					<!-- Lists -->
					<UTooltip text="Lists">
						<UButton
							:icon="
								editor?.isActive('bulletList')
									? 'i-lucide-list'
									: editor?.isActive('orderedList')
										? 'i-lucide-list-ordered'
										: 'i-lucide-list'
							"
							trailingIcon="i-lucide-chevron-down"
							:ui="{ trailingIcon: 'size-3', base: 'gap-0' }"
							:variant="editor?.isActive('bulletList') ? 'soft' : 'ghost'"
							color="neutral"
						></UButton>
					</UTooltip>
				</UDropdownMenu>

				<USeparator class="h-7 shrink-0" orientation="vertical" />

				<UTooltip text="Bold">
					<UButton
						:variant="editor?.isActive('bold') ? 'soft' : 'ghost'"
						:disabled="!editor?.can().chain().focus().toggleBold().run()"
						color="neutral"
						icon="i-lucide-bold"
						class="inline-flex size-8 items-center justify-center [&_>span]:size-4.5"
						@click="editor?.chain().focus().toggleBold().run()"
					/>
				</UTooltip>
				<UTooltip text="Italic">
					<UButton
						:variant="editor?.isActive('italic') ? 'soft' : 'ghost'"
						:disabled="!editor?.can().chain().focus().toggleItalic().run()"
						color="neutral"
						icon="i-lucide-italic"
						class="inline-flex size-8 items-center justify-center [&_>span]:size-4.5"
						@click="editor?.chain().focus().toggleItalic().run()"
					/>
				</UTooltip>
				<UTooltip text="Strikethrough">
					<UButton
						:variant="editor?.isActive('strike') ? 'soft' : 'ghost'"
						:disabled="!editor?.can().chain().focus().toggleStrike().run()"
						color="neutral"
						icon="i-lucide-strikethrough"
						class="inline-flex size-8 items-center justify-center [&_>span]:size-4.5"
						@click="editor?.chain().focus().toggleStrike().run()"
					/>
				</UTooltip>
				<UTooltip text="Code">
					<UButton
						:variant="editor?.isActive('code') ? 'soft' : 'ghost'"
						:disabled="!editor?.can().chain().focus().toggleCode().run()"
						color="neutral"
						icon="i-lucide-code"
						class="inline-flex size-8 items-center justify-center [&_>span]:size-4.5"
						@click="editor?.chain().focus().toggleCode().run()"
					/>
				</UTooltip>
				<USeparator class="h-7 shrink-0" orientation="vertical" />
				<UTooltip text="Link">
					<UButton
						:variant="editor?.isActive('link') ? 'soft' : 'ghost'"
						:disabled="!editor?.can().chain().focus().toggleLink({ href: 'https://example.com' }).run()"
						color="neutral"
						icon="i-lucide-link"
						class="inline-flex size-8 items-center justify-center [&_>span]:size-4.5"
						@click="linkDialogOpen = true"
					/>
				</UTooltip>
				<UTooltip text="Blockquote">
					<UButton
						:variant="editor?.isActive('blockquote') ? 'soft' : 'ghost'"
						:disabled="!editor?.can().chain().focus().toggleBlockquote().run()"
						color="neutral"
						icon="i-lucide-text-quote"
						class="inline-flex size-8 items-center justify-center [&_>span]:size-4.5"
						@click="editor?.chain().focus().toggleBlockquote().run()"
					/>
				</UTooltip>
				<USeparator class="h-7 shrink-0" orientation="vertical" />
				<!-- Alignment -->
				<UTooltip text="Align Left">
					<UButton
						:variant="editor?.isActive({ textAlign: 'left' }) ? 'soft' : 'ghost'"
						:disabled="!editor?.can().chain().focus().setTextAlign('left').run()"
						color="neutral"
						icon="i-lucide-align-left"
						class="inline-flex size-8 items-center justify-center [&_>span]:size-4.5"
						@click="editor?.chain().focus().setTextAlign('left').run()"
					/>
				</UTooltip>
				<UTooltip text="Align Center">
					<UButton
						:variant="editor?.isActive({ textAlign: 'center' }) ? 'soft' : 'ghost'"
						:disabled="!editor?.can().chain().focus().setTextAlign('center').run()"
						color="neutral"
						icon="i-lucide-align-center"
						class="inline-flex size-8 items-center justify-center [&_>span]:size-4.5"
						@click="editor?.chain().focus().setTextAlign('center').run()"
					/>
				</UTooltip>
				<UTooltip text="Align Right">
					<UButton
						:variant="editor?.isActive({ textAlign: 'right' }) ? 'soft' : 'ghost'"
						:disabled="!editor?.can().chain().focus().setTextAlign('right').run()"
						color="neutral"
						icon="i-lucide-align-right"
						class="inline-flex size-8 items-center justify-center [&_>span]:size-4.5"
						@click="editor?.chain().focus().setTextAlign('right').run()"
					/>
				</UTooltip>
				<UTooltip text="Align Justify">
					<UButton
						:variant="editor?.isActive({ textAlign: 'justify' }) ? 'soft' : 'ghost'"
						:disabled="!editor?.can().chain().focus().setTextAlign('justify').run()"
						color="neutral"
						icon="i-lucide-align-justify"
						class="inline-flex size-8 items-center justify-center [&_>span]:size-4.5"
						@click="editor?.chain().focus().setTextAlign('justify').run()"
					/>
				</UTooltip>
				<USeparator class="h-7 shrink-0" orientation="vertical" />
				<UTooltip text="Youtube">
					<UButton
						:variant="editor?.isActive('youtube') ? 'soft' : 'ghost'"
						color="neutral"
						icon="i-lucide-youtube"
						class="inline-flex size-8 items-center justify-center [&_>span]:size-4.5"
						@click="youtubeDialogOpen = true"
					/>
				</UTooltip>
			</template>

			<EditorContent :class="editorClass" :editor="editor" />
		</UCard>
		<div class="mt-2 flex items-center gap-2">
			<svg
				v-if="minimumCharacters && characterCount < minimumCharacters"
				class="rounded-full"
				height="20"
				width="20"
				viewBox="0 0 20 20"
			>
				<circle r="10" cx="10" cy="10" fill="var(--ui-bg-accented)" />
				<circle
					r="5"
					cx="10"
					cy="10"
					fill="transparent"
					:stroke="minimumCharacters && characterCount >= minimumCharacters ? 'var(--ui-success)' : 'var(--ui-error)'"
					stroke-width="10"
					:stroke-dasharray="`calc(${percentage} * 31.4 / 100) 31.4`"
					transform="rotate(-90) translate(-20)"
				/>
				<circle r="6" cx="10" cy="10" fill="var(--ui-bg)" />
			</svg>
			<UIcon v-else name="i-heroicons-check-circle" class="size-5 text-success"></UIcon>
			<span v-if="minimumCharacters" class="text-xs" :class="characterCount >= minimumCharacters ? 'text-success' : 'text-error'">
				{{ characterCount >= minimumCharacters ? "Done!" : `${characterCount} / ${minimumCharacters} minimum characters` }}
			</span>
		</div>
	</div>

	<UiResponsiveModal
		v-if="editor"
		v-model:open="youtubeDialogOpen"
		:drawerProps="{ title: 'Add Youtube Video' }"
		:modalProps="{ title: 'Add Youtube Video', ui: { content: 'max-w-sm' } }"
		title="Add Youtube Video"
	>
		<template #body>
			<div class="flex w-full flex-col gap-4">
				<UFormField label="Youtube URL" required>
					<UInput
						v-model="linkInfo.href"
						placeholder="https://www.youtube.com/watch?v=example"
						class="w-full"
						label="Youtube URL"
						:labelProps="{ class: 'text-sm' }"
					/>
				</UFormField>
				<UButton
					block
					color="primary"
					icon="i-lucide-upload"
					@click="
						() => {
							editor!.commands.setYoutubeVideo({ src: linkInfo.href });
							youtubeDialogOpen = false;
							linkInfo.href = '';
						}
					"
				>
					Add Youtube Video
				</UButton>
			</div>
		</template>
	</UiResponsiveModal>

	<UiResponsiveModal
		v-if="editor"
		v-model:open="linkDialogOpen"
		:drawerProps="{ title: 'Add Link' }"
		:modalProps="{ title: 'Add Link', ui: { content: 'max-w-sm' } }"
	>
		<template #body>
			<div class="flex w-full flex-col gap-4">
				<UFormField label="URL" required>
					<UInput
						v-model="linkInfo.href"
						placeholder="https://example.com"
						class="w-full"
						label="Link"
						:labelProps="{ class: 'text-sm' }"
					/>
				</UFormField>
				<UFormField label="Display Text">
					<UInput
						v-model="linkInfo.displayText"
						placeholder="Display Text (optional)"
						class="w-full leading-0"
						label="Display Text"
						:labelProps="{ class: 'text-sm' }"
					/>
				</UFormField>

				<UFormField label="Open in new tab" class="flex items-center gap-2 *:mt-0">
					<USwitch v-model="linkInfo.openInNewTab" />
				</UFormField>
				<UButton
					block
					color="primary"
					icon="i-lucide-plus"
					@click="
						() => {
							editor!
								.chain()
								.focus()
								.extendMarkRange('link')
								.insertContent({
									type: 'text',
									text: linkInfo.displayText || linkInfo.href,
									marks: [
										{
											type: 'link',
											attrs: {
												href: linkInfo.href,
												target: linkInfo.openInNewTab ? '_blank' : '',
												rel: linkInfo.openInNewTab ? 'noopener noreferrer' : '',
											},
										},
									],
								})
								.setLink({ href: linkInfo.href })
								.run();
							linkDialogOpen = false;
							linkInfo.href = '';
							linkInfo.displayText = '';
							linkInfo.openInNewTab = false;
						}
					"
				>
					Add Link
				</UButton>
			</div>
		</template>
	</UiResponsiveModal>
</template>
