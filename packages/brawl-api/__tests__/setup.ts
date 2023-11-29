import { setTimeout } from "node:timers/promises";
import { beforeEach } from "vitest";

beforeEach(async () => {
	// add an aritifical delay to requests
	await setTimeout(1000);
});
