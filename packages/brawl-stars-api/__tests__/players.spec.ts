import { describe, expect, test } from "vitest";
import { client } from "./util/client";

describe("PlayersApi", () => {
	describe("getPlayer", () => {
		test("GIVEN valid player tag without hashtag THEN should return player", async () => {
			const player = await client.players.getPlayer("9V9GRRY00");
			expect(player.name).toBe("Death_Blows");
			expect(player.tag).toBe("#9V9GRRY00");
		});

		test("GIVEN valid player tag with hashtag THEN should return player", async () => {
			const player = await client.players.getPlayer("#9V9GRRY00");
			expect(player.name).toBe("Death_Blows");
			expect(player.tag).toBe("#9V9GRRY00");
		});

		test("GIVEN invalid player tag THEN should throw error", async () => {
			await expect(client.players.getPlayer("invalid")).rejects.toThrow("404");
		});

		test("GIVEN valid player tag THEN should return player battle log", async () => {
			const battleLog = await client.players.getPlayerBattleLog("9V9GRRY00");
			expect(battleLog.length).toBeGreaterThan(0);
		});
	});

	describe("getPlayerBattleLog", () => {
		test("GIVEN valid player tag without hashtag THEN should return VALID player battle log", async () => {
			const battleLog = await client.players.getPlayerBattleLog("9V9GRRY00");
			expect(battleLog.length).toBeGreaterThan(0);
			expect(Array.isArray(battleLog)).toBe(true);
			expect(battleLog.every((battle) => battle.battleTime instanceof Date)).toBe(true);
		});

		test("GIVEN invalid player tag with hashtag THEN should throw a 404", async () => {
			const battleLog = client.players.getPlayerBattleLog("#INVALID");
			await expect(battleLog).rejects.toThrow("404");
		});
	});
});
