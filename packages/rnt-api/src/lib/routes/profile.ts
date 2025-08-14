import { type $Fetch } from "ofetch";
import { ProfileResult } from "../structures/profile/profile-result";
import { type RawProfileResponse } from "../types/profile";

export class ProfileRoute {
	private readonly $fetch: $Fetch;

	public constructor($fetch: $Fetch) {
		this.$fetch = $fetch;
	}

	public async get(tag: string) {
		const response = await this.$fetch<RawProfileResponse>("/profile", { query: { tag } });
		if (!response.ok) {
			throw new Error(`Failed to fetch profile for tag ${tag}: ${JSON.stringify(response, null, 2)}`);
		}

		return new ProfileResult(response.result!);
	}
}
