export const profileConfigKeys = {
	all: ["profileConfigs"] as const,
	detail: (tag: string) => [...profileConfigKeys.all, tag] as const,
};

export const profileConfigDetailQuery = (tag: string) => {
	return queryOptions({
		queryKey: profileConfigKeys.detail(tag),
		queryFn: () => $fetch(`/api/profiles/${encodeURIComponent(tag)}/config`),
		gcTime: 1000 * 500,
		staleTime: 1000 * 120,
	});
};
