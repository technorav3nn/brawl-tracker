import { z } from "zod";

export const guideSchemaClient = (characterCount: number) =>
	z.object({
		name: z.string().min(5, "Name must be 5 or more characters").max(40, "Name cant be more than 40 characters"),
		shortDescription: z
			.string()
			.min(10, "Short description must be 5 or more characters")
			.max(100, "Short description cant be more than 100 characters"),
		isInDepth: z.boolean().optional(),
		editorHtml: z.string().refine(() => characterCount > 200, {
			message: "You must provide a guide content",
		}),
	});

export const guideSchemaServer = guideSchemaClient(0).omit({ editorHtml: true }).extend({
	editorHtml: z.string(),
	brawlerId: z.string(),
	guideId: z.string().optional(),
});
