import type { ClubType, RawAllianceSearchAlliance } from "../../types/alliance-search";

export class AllianceSearchAlliance {
	public readonly badge: number;
	public readonly id: {
		hi: number;
		lo: number;
		tag: string;
	};
	public readonly memberCount: number;
	public readonly minimumTrophies: number;
	public readonly name: string;
	public readonly region: string;
	public readonly trophies: number;
	public readonly type: ClubType;
	public readonly isFamilyFriendly: boolean;

	public constructor(alliance: RawAllianceSearchAlliance) {
		// note: online players aren't included since api (and game) always returns 0
		this.badge = alliance.badge;
		this.id = alliance.id;
		this.memberCount = alliance.member_count;
		this.minimumTrophies = alliance.minimum_trophies;
		this.name = alliance.name;
		this.region = alliance.region;
		this.trophies = alliance.trophies;
		this.isFamilyFriendly = alliance.unk6 ?? false;

		if (alliance.type === 1) {
			this.type = "open";
		} else if (alliance.type === 2) {
			this.type = "invite-only";
		} else if (alliance.type === 3) {
			this.type = "closed";
		} else {
			this.type = "open";
		}
	}
}
