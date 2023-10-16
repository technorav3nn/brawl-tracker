import { describe, expect, it } from "vitest";

import { brawlApi } from "../dist";

describe("brawlapi", () => {
    describe("Brawlers", () => {
        it("GIVEN valid brawler id THEN returns brawler", async () => {
            const brawler = await brawlApi.brawlers.getBrawlerById(16000000);
            expect(brawler.id).toBe(16000000);
        });
    });
});
