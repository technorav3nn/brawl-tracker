import { brawlApi } from "@brawltracker/brawl-api";
import { Time } from "@sapphire/time-utilities";
import { Command, RegisterCommand } from "@skyra/http-framework";
import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from "discord.js";
import { cachePromise } from "$lib/util/promises";

const getBrawlers = cachePromise(async () => brawlApi.brawlers.getAllBrawlers(), {
	staleWhileRevalidate: true,
	ttl: Time.Hour * 24,
});

@RegisterCommand((builder) => builder.setName("brawlers").setDescription("Get a list of all brawlers"))
export class BrawlersCommand extends Command {
	public override async chatInputRun(interaction: Command.ChatInputInteraction) {
		// temporary
		// const brawlers = await getBrawlers();
		return interaction.reply({
			components: [
				new ActionRowBuilder<ButtonBuilder>()
					.addComponents(
						new ButtonBuilder().setLabel("Test").setCustomId("test").setStyle(ButtonStyle.Primary)
					)
					.toJSON(),
			],
			content: "test",
		});
	}

	public override async autocompleteRun(interaction: Command.AutocompleteInteraction) {
		return interaction.reply({
			choices: (await getBrawlers()).list.map((brawler) => ({
				name: brawler.name,
				value: brawler.name,
			})),
		});
	}
}
