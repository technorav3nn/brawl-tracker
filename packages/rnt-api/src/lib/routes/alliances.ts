import type { $Fetch } from "ofetch";
import { AllianceSearchResult } from "../structures/alliance-search/alliance-search-result";
import type { AllianceSearchOptions, RawAllianceSearchResponse } from "../types/alliance-search";

export class AlliancesRoute {
	private readonly $fetch: $Fetch;

	public constructor($fetch: $Fetch) {
		this.$fetch = $fetch;
	}

	public async search({ query }: AllianceSearchOptions) {
		const response = await this.$fetch<RawAllianceSearchResponse>("/alliances/search", {
			query: { query },
		});
		return new AllianceSearchResult(response);
	}
}
