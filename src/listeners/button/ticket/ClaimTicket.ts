import { openTicketStaff } from '../../../utils/ticket/TicketOpenStaff';
import { createID } from '../../../utils/Utils';
import {Channel, EmbedBuilder} from "discord.js";
import config from '../../../config.json';

async function onClickClaimTicket(interaction, client) {
    if (!interaction.isButton()) return;

	  const user = await client.users.fetch(interaction.user.id);
    if (interaction.customId === 'claim_ticket') {
			if(!interaction.member.roles.cache.has(config.team_role_id)) {
				await interaction.reply({ embeds: [new EmbedBuilder()
						.setColor(0xcb380c)
						.setTitle('No permission!')
						.setDescription("Only a team member can claim a ticket!")
						.setTimestamp()], ephemeral: true });
				return;
			}
        client.channels.fetch("1117847277449511053").then(channel => {
            const embed = new EmbedBuilder()
                .setColor(0x00C1FF)
                .setTitle("Claimed ticket #" + interaction.channel.name)
                .setDescription(`By ` + user.username)
                .setTimestamp()
            channel.send({ embeds: [embed]});
        });
        interaction.channel.permissionOverwrites.edit(config.team_role_id, { ViewChannel: false });
        interaction.channel.permissionOverwrites.edit(user.id, { ViewChannel: true });
        await interaction.reply({ embeds: [new EmbedBuilder()
                .setColor(0x7ACB0C)
                .setTitle('Success!')
                .setDescription("You claimed the ticket!")
                .setTimestamp()], ephemeral: true });
    }
}

export { onClickClaimTicket }
