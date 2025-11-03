import type { BrawlApiBrawler } from "@brawltracker/brawl-api";

export const brawlerKeys = {
	all: () => ["brawlers"] as const,
	detail: (id: string) => [...brawlerKeys.all(), id] as const,
	cdn: (id: string) => [...brawlerKeys.all(), "cdn", id] as const,
};

export const brawlersQuery = () => {
	return queryOptions({
		queryKey: brawlerKeys.all(),
		queryFn: () => $fetch("/api/brawlers"),
		gcTime: 1000 * 500,
		staleTime: 1000 * 120,
		select: (d) => (d as any).list,
	});
};

export function brawlerByIdQuery(id: string) {
	return queryOptions({
		queryKey: brawlerKeys.detail(id),
		queryFn: () => $fetch(`/api/brawlers/${id}`) as Promise<BrawlApiBrawler>,
		gcTime: 1000 * 500,
		staleTime: 1000 * 120,
	});
}

export function brawlerCdnByIdQuery(id: string) {
	return queryOptions({
		queryKey: brawlerKeys.cdn(id),
		queryFn: () => $fetch(`/api/brawlers/cdn/${id}`),
		gcTime: 1000 * 500,
		staleTime: 1000 * 120,
	});
}
