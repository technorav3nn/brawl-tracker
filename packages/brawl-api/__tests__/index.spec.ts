import { describe, expect, test } from "vitest";
import { type BrawlApiFetchError, brawlApi } from "../dist";

describe("Brawl API", () => {
	describe("/brawlers endpoint", () => {
		test("GIVEN valid brawler id THEN returns brawler", async () => {
			const brawler = await brawlApi.brawlers.getBrawlerById(16000000);
			expect(brawler.id).toBe(16000000);
			expect(brawler.name).toBe("Shelly");
		});
		test("GIVEN invalid brawler id THEN returns 404", async () => {
			try {
				await brawlApi.brawlers.getBrawlerById(16000001);
			} catch (error) {
				expect((error as BrawlApiFetchError).status).toEqual(404);
			}
		});
	});

	describe("/events endpoint", () => {
		test("SHOULD not return an error", async () => {
			expect(await brawlApi.events.getEventRotation()).not.toThrow();
		});
	});
});
