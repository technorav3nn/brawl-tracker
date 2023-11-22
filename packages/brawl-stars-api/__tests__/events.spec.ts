import { describe, expect, test } from "vitest";
import { client } from "./util/client";

describe("EventsApi", () => {
	test("WITH event rotation THEN first event slotId is 1", async () => {
		const rotation = await client.events.getEventRotation();
		expect(rotation[0]?.slotId).toEqual(1);
	});

	test("WITH event rotation THEN should be a valid rotation", async () => {
		const rotation = await client.events.getEventRotation();
		expect(rotation.length).toBeGreaterThan(0);
		expect(Array.isArray(rotation)).toBeTruthy();
	});

	test("WITH event rotation THEN api should not throw an error", async () => {
		await expect(client.events.getEventRotation()).resolves.not.toThrowError();
	});

	test("WITH event rotation THEN event times should all have Dates", async () => {
		const rotation = await client.events.getEventRotation();
		for (const event of rotation) {
			expect(event.startTime).toBeInstanceOf(Date);
			expect(event.endTime).toBeInstanceOf(Date);
		}
	});
});
