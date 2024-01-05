import "$lib/setup";
import process from "node:process";
import { envParseInteger, envParseString, envIsDefined } from "@skyra/env-utilities";
import { Client, container } from "@skyra/http-framework";
import { green, magentaBright } from "colorette";

async function main() {
	const client = new Client();
	await client.load();

	if (envIsDefined("REGISTRY_GUILD_ID")) {
		await container.applicationCommandRegistry.pushAllCommandsInGuild(envParseString("REGISTRY_GUILD_ID"));
	} else {
		await container.applicationCommandRegistry.pushGlobalCommands();
	}

	client.on("error", (error) => container.logger.error(error));

	const address = envParseString("ADDRESS");
	const port = envParseInteger("HTTP_PORT", 4_000);

	void client.listen({ address, port });

	container.logger.info(
		`Listening on ${green(address)}:${green(port.toString())} in ${magentaBright(
			process.env.NODE_ENV ?? "unknown"
		)} mode.`
	);
}

void main();
