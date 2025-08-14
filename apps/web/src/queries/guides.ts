import type { GuideWithUser } from "$server/database/schema";

export const guideKeys = {
	allByBrawler: (brawlerId: string) => ["guides", brawlerId],
	id: (guideId?: string) => ["guides", guideId],
};

export const guidesForBrawler = (brawlerId: string) =>
	queryOptions({
		queryKey: guideKeys.allByBrawler(brawlerId),
		queryFn: () => $fetch("/api/guides/list", { query: { brawlerId } }),
		staleTime: 1000 * 60 * 5,
		gcTime: 1000 * 60 * 5,
	});
export const guideById = (guideId?: string) =>
	queryOptions({
		queryKey: guideKeys.id(guideId),
		queryFn: guideId ? () => $fetch(`/api/guides/${guideId}`) as Promise<GuideWithUser> : undefined,
		staleTime: 1000 * 60 * 5,
		gcTime: 1000 * 60 * 5,
	});
