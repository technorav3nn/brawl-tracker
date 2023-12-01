import { describe, expect, test } from "vitest";
import { client } from "./util/client";

describe("ClubsApi", () => {
	describe("getClub", () => {
		test("WITH valid club tag THEN should be a valid club", async () => {
			const club = await client.clubs.getClub("#2PP00");
			expect(club.tag).toEqual("#2PP00");
		});

		test("WITH invalid club tag THEN should throw a 404", async () => {
			const club = client.clubs.getClub("#DOESNOTEXIST");
			await expect(club).rejects.toThrow("404");
		});
	});

	describe("getMembers", () => {
		test("WITH club tag THEN should have a non zero # of members", async () => {
			const members = await client.clubs.getClubMembers("#2PP00");
			expect(members.length).toBeGreaterThan(0);
		});

		test("WITH bad club tag THEN should throw a 404", async () => {
			const members = client.clubs.getClubMembers("#DOESNOTEXIST");
			await expect(members).rejects.toThrow("404");
		});
	});
});
