import { z } from "zod";

export const tagBodySchema = z.object({
	type: z.enum(["club", "player"]),
});

export const addTagsBodySchema = tagBodySchema.extend({
	tags: z.array(z.string()),
});

export const removeTagBodySchema = tagBodySchema.extend({
	tag: z.string(),
});

export const getTagsBodySchema = tagBodySchema;

export const updateTagBodySchema = z.object({
	playerTags: z.array(z.string()),
	clubTags: z.array(z.string()),
});
