import { type VariantProps, cva } from "class-variance-authority";

export { default as Sheet } from "./sheet.vue";
export { default as SheetTrigger } from "./sheet-trigger.vue";
export { default as SheetClose } from "./sheet-close.vue";
export { default as SheetContent } from "./sheet-content.vue";
export { default as SheetHeader } from "./sheet-header.vue";
export { default as SheetTitle } from "./sheet-title.vue";
export { default as SheetDescription } from "./sheet-description.vue";
export { default as SheetFooter } from "./sheet-footer.vue";

export const sheetVariants = cva(
	"fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:duration-500",
	{
		variants: {
			side: {
				top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
				bottom:
					"inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
				left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
				right:
					"inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm",
			},
		},
		defaultVariants: {
			side: "right",
		},
	}
);

export type SheetVariants = VariantProps<typeof sheetVariants>;
