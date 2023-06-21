import { openTicketStaff } from '../../../utils/ticket/TicketOpenStaff';
import { createID } from '../../../utils/Utils';
import { Channel, Embed, EmbedBuilder} from "discord.js";
import config from '../../../config.json';

async function onClickAcceptContentPlus(interaction, client) {
	if (!interaction.isButton()) return;
	const staff = await interaction.guild.members.fetch(interaction.user.id);
	if (interaction.customId != 'accept_content_plus') return;
		const embed = interaction.message.embeds[0];
		if(!embed) {
			await interaction.reply({ embeds: [new EmbedBuilder()
					.setColor(0xcb380c)
					.setTitle('Failed!')
					.setDescription("Embed not found!")
					.setTimestamp()], ephemeral: true });
			return;
		}
		const title = embed.title;
		if(!title) {
			await interaction.reply({ embeds: [new EmbedBuilder()
					.setColor(0xcb380c)
					.setTitle('Failed!')
					.setDescription("Embed title not found!" + title.toString())
					.setTimestamp()], ephemeral: true });
			return;
		}
		const user = await client.users.fetch(title);

		if(!user) {
			interaction.reply({ embeds: [new EmbedBuilder()
					.setColor(0xcb380c)
					.setTitle('Failed!')
					.setDescription("Failed to find user!")
					.setTimestamp()], ephemeral: true });
			return;
		}

		//ADD CONTENT ROLE
		const guild = client.guilds.cache.get(config.guild_id);
		const role = guild.roles.cache.get(config.content_plus_role_id);
		const member = guild.members.cache.get(user.id);
		await member.roles.add(role);

		interaction.reply({ embeds: [new EmbedBuilder()
				.setColor(0x7ACB0C)
				.setTitle("Accepted!")
				.setDescription("<@"+interaction.user.id +">" + " accepted the content+ request by <@" + user.id + ">!")
				.setTimestamp()],});
		interaction.message.delete();

}

export { onClickAcceptContentPlus }
