import type { RawAllianceSearchResponse } from "../../types/alliance-search";
import { AllianceSearchAlliance } from "./alliance-search-aliance";

export class AllianceSearchResult {
	public readonly alliances: AllianceSearchAlliance[];
	public readonly resultCount: number;
	public readonly ok: boolean;

	public constructor(data: RawAllianceSearchResponse) {
		this.ok = data.ok;
		this.resultCount = data.result.result_count;
		this.alliances = data.result.alliances.map((alliance) => new AllianceSearchAlliance(alliance));
	}
}
