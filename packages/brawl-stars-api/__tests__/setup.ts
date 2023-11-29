import { setTimeout } from "node:timers/promises";
import { beforeEach } from "vitest";

beforeEach(async () => {
	await setTimeout(100);
});
