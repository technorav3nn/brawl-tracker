import { describe, expect, test } from "vitest";
import { getBrawlerData, normalizeNameToCdnName } from "../src";

describe("@brawltracker/cdn", () => {
	describe("getBrawlerData", () => {
		test("GIVEN valid brawler name THEN returns brawler data", async () => {
			const promise = getBrawlerData(normalizeNameToCdnName("El Primo"));
			await expect(promise).resolves.not.toThrow();

			const data = await promise;
			expect(data).toMatchSnapshot();
			expect(data.id).toBe("el_primo");
			expect(data.name).toBe("El Primo");
		});
	});
});
