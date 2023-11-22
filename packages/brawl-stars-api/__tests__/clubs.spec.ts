import { describe, expect, test } from "vitest";
import { client } from "./util/client";

describe("ClubsApi", () => {
	test("WITH club tag THEN should be a valid club", async () => {
		const club = await client.clubs.getClub("#2PP00");
		expect(club.tag).toEqual("#2PP00");
	});
});
