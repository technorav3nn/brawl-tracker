import { convertApiDate, formatTag } from "@brawltracker/supercell-api-utils";
import type { $Fetch } from "ofetch";
import type { BattlelogsResponse } from "../types/battlelogs";
import type { Player } from "../types/players";

export class PlayersApi {
	private readonly $fetch: $Fetch;

	public constructor($fetch: $Fetch) {
		this.$fetch = $fetch;
	}

	public async getPlayer(tag: string) {
		return this.$fetch<Player>(`/players/${encodeURIComponent(formatTag(tag))}`);
	}

	public async getPlayerBattleLog(tag: string) {
		const { items } = await this.$fetch<BattlelogsResponse<string>>(
			`/players/${encodeURIComponent(formatTag(tag))}/battlelog`
		);
		return items.map((item) => ({
			...item,
			battleTime: convertApiDate(item.battleTime),
		}));
	}
}
