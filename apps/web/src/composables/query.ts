import type { UseQueryOptions, DefaultError, QueryKey, UseQueryReturnType, QueryClient } from "@tanstack/vue-query";

/**
 * A wrapper around `useQuery` that allows you to use it in a lazy way.
 * It's similar to `useLazyAsyncData` from Nuxt, but for Vue Query.
 *
 * It will resolve on the client side and not block navigation when navigating, but
 * in SSR it will block until the query is resolved.
 *
 * @param options - Exact same options as `useQuery` from `@tanstack/vue-query`
 * @returns A query like `useQuery`, but with the ability to be lazy and nothing else
 */
export const useLazyQuery = <
	TQueryFnData = unknown,
	TError = DefaultError,
	TData = TQueryFnData,
	TQueryKey extends QueryKey = QueryKey,
>(
	options: UseQueryOptions<TQueryFnData, TError, TData, TQueryFnData, TQueryKey>,
	queryClient: QueryClient = useQueryClient()
): UseQueryReturnType<TData, TError> => {
	const query = useQuery(options, queryClient);
	if (import.meta.server) {
		onServerPrefetch(async () => await query.suspense());
	}

	return query;
};
