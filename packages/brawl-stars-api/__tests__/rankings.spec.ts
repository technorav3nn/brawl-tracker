import { describe, expect, test } from "vitest";
import { client } from "./util/client";

describe("RankingsApi", () => {
	describe("powerLeague", () => {
		test("WITH power league seasons THEN should be valid", async () => {
			expect(await client.rankings.powerLeague.getSeasons("global")).toContainEqual(
				expect.objectContaining({
					id: expect.any(String),
					startTime: expect.any(Date),
					endTime: expect.any(Date),
				})
			);
		});
		test("WITH valid season id THEN should return a valid season's rankings", async () => {
			expect(await client.rankings.powerLeague.getSeasonRankings("global", 107)).toContainEqual(
				expect.objectContaining({
					rank: expect.any(Number),
					tag: expect.any(String),
					name: expect.any(String),
					icon: expect.any(Object),
					trophies: expect.any(Number),
				})
			);
		});
	});
});
