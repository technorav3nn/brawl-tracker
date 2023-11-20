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
		test("GIVEN event rotation api call THEN should not throw", async () => {
			expect(await brawlApi.events.getEventRotation()).not.toThrow();
		});
	});

	describe("/maps endpoint", () => {
		test("GIVEN all maps api call THEN should not throw", async () => {
			expect(await brawlApi.maps.getAllMaps()).not.toThrow();
		});
		test("GIVEN valid map id THEN returns map", async () => {
			const map = await brawlApi.maps.getMapById(15000026);
			expect(map.name).toBe("Pinhole Punt");
		});
	});

	describe("/gamemodes endpoint", () => {
		test("GIVEN all gamemodes api call THEN should not throw", async () => {
			expect(await brawlApi.gamemodes.getAllGamemodes()).not.toThrow();
		});
		test("GIVEN valid gamemode id THEN returns gamemode", async () => {
			const gamemode = await brawlApi.gamemodes.getGamemodeById(15);
			expect(gamemode.name).toBe("Super City Rampage");
		});
	});
});
