const eventKeys = {
	all: () => ["events"] as const,
};

export const eventsQuery = queryOptions({
	queryKey: eventKeys.all(),
	queryFn: () => $fetch("/api/events", { query: { type: "active" } }),
});
