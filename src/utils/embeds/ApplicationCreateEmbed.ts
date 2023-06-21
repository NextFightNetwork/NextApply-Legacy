import {ActionRowBuilder, EmbedBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder} from "discord.js";
import config from "../../config.json";

function sendEmbed(channel) {
	const embed = new EmbedBuilder()
		.setColor(0xEB8922)
		.setTitle(config.application_name)
		.setThumbnail('https://media.discordapp.net/attachments/1052241511795937381/1117537388172943451/animapply.gif?width=625&height=625')
		.setDescription('Please select the role you want to apply for from the dropdown menu below')
		.setTimestamp()

	const select = new StringSelectMenuBuilder()
		.setCustomId('apply')
		.setPlaceholder('Click to select!')
		.addOptions(
			new StringSelectMenuOptionBuilder()
				.setLabel('Content')
				.setDescription('Apply for content and content+')
				.setEmoji('1117513342563663945')
				.setValue('content'),
			new StringSelectMenuOptionBuilder()
				.setLabel('Developer')
				.setDescription('Apply for developer')
				.setEmoji('1117505982025699440')
				.setValue('developer'),
			new StringSelectMenuOptionBuilder()
				.setLabel('Builder')
				.setDescription('Apply for builder')
				.setEmoji('1117506724950192168')
				.setValue('builder'),
			new StringSelectMenuOptionBuilder()
				.setLabel('Designer')
				.setDescription('Apply for designer')
				.setEmoji('1117511332321841202')
				.setValue('designer'),
		);

	const row = new ActionRowBuilder()
		.addComponents(select);

	channel.send({ embeds: [embed], components: [row] });
}

export { sendEmbed }