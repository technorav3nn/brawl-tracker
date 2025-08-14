import type {
	RawProfile,
	RawProfileAccountTag,
	RawProfileAlliance,
	RawProfileBattleCard,
	RawProfileBrawler,
	RawProfileStat,
} from "../../types/profile";

export class ProfileResult {
	public accountTag: RawProfileAccountTag;
	public favoriteBrawler: number;
	public winstreakBrawler: number;
	public brawlerCount: number;
	public brawlers: RawProfileBrawler[];
	public stats: RawProfileStat[];
	public name: string;
	public profileAvatar: number;
	public nameColor: number;
	public brawlpass: number;
	public hasUnkField: boolean;
	public unkField: number;
	public unkString: string;
	public unk6: number;
	public unk7: number;
	public maxWinstreak: number;
	public battleCard: RawProfileBattleCard;
	public isInAlliance: boolean;
	public alliance: RawProfileAlliance;

	public constructor(profile: RawProfile) {
		this.accountTag = profile.account_tag;
		this.favoriteBrawler = profile.favorite_brawler;
		this.winstreakBrawler = profile.winstreak_brawler;
		this.brawlerCount = profile.brawler_count;
		this.brawlers = profile.brawlers;
		this.stats = profile.stats;
		this.name = profile.name;
		this.profileAvatar = profile.profile_avatar;
		this.nameColor = profile.name_color;
		this.brawlpass = profile.brawlpass;
		this.hasUnkField = profile.has_unk_field;
		this.unkField = profile.unk_field;
		this.unkString = profile.unk_string;
		this.unk6 = profile.unk6;
		this.unk7 = profile.unk7;
		this.maxWinstreak = profile.max_winstreak;
		this.battleCard = profile.battle_card;
		this.isInAlliance = profile.is_in_alliance;
		this.alliance = profile.alliance;
	}
}
