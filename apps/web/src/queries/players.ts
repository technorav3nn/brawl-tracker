const playerKeys = {
	all: () => ["players"] as const,
	detail: (tag: string) => [...playerKeys.all(), tag] as const,
	battlelogDetail: (tag: string) => [...playerKeys.detail(tag), "battlelog"] as const,
	meowApiDetail: (tag: string) => [...playerKeys.detail(tag), "meowApi"] as const,
};

export const playersDetailQuery = (tag: string) => {
	return queryOptions({
		queryKey: playerKeys.detail(tag),
		queryFn: () => $fetch("/api/players", { query: { tag } }),
		gcTime: 1000 * 120,
		staleTime: 1000 * 60,
	});
};

export const playersBattlelogDetailQuery = (tag: string) => {
	return queryOptions({
		queryKey: playerKeys.battlelogDetail(tag),
		queryFn: () => $fetch("/api/players/battlelog", { query: { tag } }),
		gcTime: 1000 * 120,
		staleTime: 1000 * 60,
	});
};

export const playersMeowApiDetailQuery = (tag: string) => {
	return queryOptions({
		queryKey: playerKeys.meowApiDetail(tag),
		queryFn: () => $fetch(`/api/players/${tag.replace("#", "")}/meow-api`),
		gcTime: 1000 * 120,
		staleTime: 1000 * 60,
	});
};
