import { describe, expect, test } from "vitest";
import { type BrawlApiFetchError, brawlApi } from "../src";

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
			const rotation = brawlApi.events.getEventRotation();
			await expect(rotation).resolves.not.toThrow();
		});
	});

	describe("/maps endpoint", () => {
		test("GIVEN all maps api call THEN should not throw", async () => {
			const maps = brawlApi.maps.getAllMaps();
			await expect(maps).resolves.not.toThrow();
		});
		test("GIVEN valid map id THEN returns map", async () => {
			const map = await brawlApi.maps.getMapById(15000026);
			expect(map.name).toBe("Pinhole Punt");
		});
	});

	describe("/gamemodes endpoint", () => {
		test("GIVEN all gamemodes api call THEN should not throw", async () => {
			const gamemodes = brawlApi.gamemodes.getAllGamemodes();
			await expect(gamemodes).resolves.not.toThrow();
		});
		test("GIVEN valid gamemode id THEN returns gamemode", async () => {
			const gamemode = brawlApi.gamemodes.getGamemodeById(15);
			await expect(gamemode).resolves.toHaveProperty("name");
		});
	});

	describe("/icons endpoint", () => {
		test("GIVEN all icons api call THEN should not throw", async () => {
			await expect(brawlApi.icons.getAllIcons()).resolves.not.toThrow();
		});
		test("GIVEN all icons THEN should have club and player icons", async () => {
			await expect(brawlApi.icons.getAllIcons()).resolves.toHaveProperty("club");
		});
	});

	describe("/locations endpoint", () => {
		test("GIVEN all locations api call THEN should not throw", async () => {
			await expect(brawlApi.locations.getLocations()).resolves.not.toThrow();
		});
	});
});
