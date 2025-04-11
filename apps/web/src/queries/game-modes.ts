export const gameModeKeys = {
	all: () => ["game-modes"] as const,
	detail: (id: string) => [...gameModeKeys.all(), id] as const,
};

export const gameModesQuery = () => {
	return queryOptions({
		queryKey: gameModeKeys.all(),
		queryFn: () => $fetch("/api/game-modes"),
		gcTime: 1000 * 500,
		staleTime: 1000 * 120,
	});
};
