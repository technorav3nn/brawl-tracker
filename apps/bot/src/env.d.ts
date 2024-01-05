import type { IntegerString } from "@skyra/env-utilities";

declare module "@skyra/env-utilities" {
	interface Env {
		ADDRESS: string;
		DISCORD_CLIENT_ID: string;
		DISCORD_PUBLIC_KEY: string;
		DISCORD_TOKEN: string;
		HTTP_PORT: IntegerString;
		OWNER: string;
		REGISTRY_GUILD_ID: string;
	}
}

export default undefined;
