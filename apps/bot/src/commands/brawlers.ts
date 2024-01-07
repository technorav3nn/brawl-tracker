import { brawlApi } from "@brawltracker/brawl-api";
import { ApplyOptions } from "@sapphire/decorators";
import { Command } from "@sapphire/framework";
import { Time } from "@sapphire/time-utilities";
import { registerCommand } from "$lib/util/commands";
import { cachePromise } from "$lib/util/promises";

export const getBrawlers = cachePromise(async () => brawlApi.brawlers.getAllBrawlers(), {
	staleWhileRevalidate: true,
	ttl: Time.Hour * 24,
});

@ApplyOptions<Command.Options>({
	name: "brawlers",
	description: "Get a list of all brawlers in BR",
})
export class BrawlersCommand extends Command {
	public async chatInputRun(interaction: Command.ChatInputCommandInteraction) {
		return interaction.reply({
			content: "hello",
		});
	}

	public override registerApplicationCommands(registry: Command.Registry) {
		registerCommand((builder) => builder.setName(this.name).setDescription(this.description), registry);
	}
}
