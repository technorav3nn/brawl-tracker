import { convertApiDate } from "@brawltracker/supercell-api-utils";
import type { $Fetch } from "ofetch";
import type { EventRotationItem } from "../types/events";

export class EventsApi {
	private readonly $fetch: $Fetch;

	public constructor($fetch: $Fetch) {
		this.$fetch = $fetch;
	}

	public async getEventRotation() {
		const rotation = await this.$fetch<EventRotationItem<string>[]>("/events/rotation");
		return rotation.map((event) => ({
			...event,
			startTime: convertApiDate(event.startTime),
			endTime: convertApiDate(event.endTime),
		})) as EventRotationItem<Date>[];
	}
}
