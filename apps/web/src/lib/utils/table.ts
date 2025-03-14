import type { Column } from "@tanstack/vue-table";
import { UButton } from "#components";

export function createSortingButton(column: Column<any>, header: string) {
	const isSorted = column.getIsSorted();
	return h(UButton, {
		color: "neutral",
		variant: "ghost",
		label: header,
		icon: isSorted
			? isSorted === "asc"
				? "i-heroicons-bars-arrow-up"
				: "i-heroicons-bars-arrow-down"
			: "i-heroicons-arrows-up-down",
		class: "-mx-2.5",
		onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
	});
}
