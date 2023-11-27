import { test, describe, expect } from "vitest";
import { client } from "./util/client";

describe("BrawlersApi", () => {
	describe("getBrawlers", () => {
		test("GIVEN all brawlers THEN should contain Charlie", async () => {
			const brawlers = await client.brawlers.getBrawlers();
			expect(brawlers).toContainEqual(expect.objectContaining({ name: "CHARLIE" }));
		});
		test("GIVEN all brawlers with limit THEN should contain 5 brawlers", async () => {
			const brawlers = await client.brawlers.getBrawlers(5);
			expect(brawlers).toHaveLength(5);
		});
	});

	describe("getBrawler", () => {
		test("GIVEN a brawler id THEN should return the brawler", async () => {
			await expect(client.brawlers.getBrawler(16000000)).resolves.toHaveProperty("name", "SHELLY");
		});
	});
});
