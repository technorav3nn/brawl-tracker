import { type ApplicationCommandRegistry } from "@sapphire/framework";
import { envParseString } from "@skyra/env-utilities";

const REGISTRY_GUILD_ID = envParseString("REGISTRY_GUILD_ID");
type CommandBuilder = ApplicationCommandRegistry["registerChatInputCommand"] extends (arg: infer T) => void
	? T
	: never;
type ContextMenuCommandBuilder = ApplicationCommandRegistry["registerContextMenuCommand"] extends (
	arg: infer T
) => void
	? T
	: never;

export function registerCommand(command: CommandBuilder, registry: ApplicationCommandRegistry) {
	return registry.registerChatInputCommand(command, { guildIds: [REGISTRY_GUILD_ID] });
}

export function registerContextMenuCommand(
	command: ContextMenuCommandBuilder,
	registry: ApplicationCommandRegistry,
	idHints?: string[]
) {
	return registry.registerContextMenuCommand(command, { guildIds: [REGISTRY_GUILD_ID], idHints });
}
