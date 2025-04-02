import type { Club } from "@brawltracker/brawl-stars-api";
import type { ApiAllianceResponse } from "@brawltracker/gene-brawl-api";

const clubKeys = {
	all: () => ["clubs"] as const,
	detail: (tag: string) => [...clubKeys.all(), tag] as const,
	meowApiDetail: (tag: string) => [...clubKeys.all(), tag, "meowApi"] as const,
};

export const clubsDetailQuery = (tag: string) => {
	return queryOptions({
		queryKey: clubKeys.detail(tag),
		queryFn: ({ queryKey }) => $fetch<Club>(`/api/club/${queryKey[1].replace("#", "")}`),
		gcTime: 1000 * 120,
		staleTime: 1000 * 60,
	});
};

export const clubsMeowApiDetailQuery = (tag: string) => {
	return queryOptions({
		queryKey: clubKeys.meowApiDetail(tag),
		queryFn: ({ queryKey }) =>
			$fetch<ApiAllianceResponse["response"]>(`/api/club/${queryKey[1].replace("#", "")}`, { query: { meowApi: true } }),
		gcTime: 1000 * 120,
		staleTime: 1000 * 60,
	});
};
