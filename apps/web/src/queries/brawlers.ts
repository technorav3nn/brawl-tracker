export const brawlerKeys = {
	all: () => ["brawlers"] as const,
	detail: (id: string) => [...brawlerKeys.all(), id] as const,
};

export const brawlersQuery = () => {
	return queryOptions({
		queryKey: brawlerKeys.all(),
		queryFn: () => $fetch("/api/brawlers"),
		gcTime: 1000 * 500,
		staleTime: 1000 * 120,
	});
};
