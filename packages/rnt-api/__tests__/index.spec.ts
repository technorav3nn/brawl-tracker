import { describe, expect, test } from "vitest";
import { Client } from "../src";

const client = new Client();

describe("Alliances API", () => {
	test("WITH alliances and valid search THEN should return correct data", async () => {
		const { alliances, ok } = await client.alliances.search({ query: "A Few Good Boys" });
		expect(ok).toBe(true);
		expect(alliances).toBeDefined();
		expect(alliances[0]).toHaveProperty("name");
	});
});
