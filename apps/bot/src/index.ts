import "$lib/setup";
import { exit } from "node:process";
import { LogLevel, SapphireClient } from "@sapphire/framework";
import { envParseString } from "@skyra/env-utilities";
import { GatewayIntentBits, Partials } from "discord.js";

const client = new SapphireClient({
	logger: {
		level: LogLevel.Debug,
	},
	shards: "auto",
	intents: [
		GatewayIntentBits.DirectMessageReactions,
		GatewayIntentBits.DirectMessages,
		GatewayIntentBits.GuildModeration,
		GatewayIntentBits.GuildEmojisAndStickers,
		GatewayIntentBits.GuildMessageReactions,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildVoiceStates,
	],
	partials: [Partials.Channel, Partials.GuildScheduledEvent],
	loadMessageCommandListeners: true,
});

async function main() {
	try {
		client.logger.info("Logging in");
		await client.login(envParseString("DISCORD_TOKEN"));
		client.logger.info("Logged in");
	} catch (error) {
		client.logger.fatal(error);
		await client.destroy();
		exit(1);
	}
}

void main();
