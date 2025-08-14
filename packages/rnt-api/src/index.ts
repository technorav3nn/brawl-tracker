import { $fetch, type $Fetch, type FetchOptions } from "ofetch";
import { RNT_API_BASE_URL } from "./lib/constants";
import { AlliancesRoute } from "./lib/routes/alliances";
import { ProfileRoute } from "./lib/routes/profile";

export class Client {
	private readonly $fetch: $Fetch;

	public alliances: AlliancesRoute;
	public profiles: ProfileRoute;

	public constructor(fetchOptions: FetchOptions = {}) {
		this.$fetch = $fetch.create({
			baseURL: RNT_API_BASE_URL,
			...fetchOptions,
		});
		this.alliances = new AlliancesRoute(this.$fetch);
		this.profiles = new ProfileRoute(this.$fetch);
	}
}

export * from "./lib/types/alliance-search";
export * from "./lib/structures/alliance-search/alliance-search-aliance";
export * from "./lib/structures/alliance-search/alliance-search-result";

export * from "./lib/types/profile";
export * from "./lib/structures/profile/profile-result";
