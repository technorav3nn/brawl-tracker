import { test, describe, expect } from "vitest";
import { client } from "./util/client";

describe("BrawlersApi", () => {
	test("GIVEN all brawlers THEN should contain Charlie", async () => {
		const brawlers = await client.brawlers.getBrawlers();
		expect(brawlers).toContainEqual(expect.objectContaining({ name: "CHARLIE" }));
	});
	test("GIVEN all brawlers with limit THEN should contain 5 brawlers", async () => {
		const brawlers = await client.brawlers.getBrawlers(5);
		expect(brawlers).toHaveLength(5);
	});
});
