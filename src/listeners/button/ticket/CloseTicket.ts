import { openTicketStaff } from '../../../utils/ticket/TicketOpenStaff';
import { createID } from '../../../utils/Utils';
import { Channel, EmbedBuilder} from "discord.js";
import { addRole, removeRole, userHasActiveTickets } from '../../../utils/Utils';
import config from '../../../config.json';

async function onClickCloseTicket(interaction, client) {
    if (!interaction.isButton()) return;
    const user = await interaction.guild.members.fetch(interaction.user.id);
    if (interaction.customId === 'close_ticket') {
        client.channels.fetch("1117847277449511053").then(channel => {
            const embed = new EmbedBuilder()
                .setColor(0xcb380c)
                .setTitle("Closed ticket #" + interaction.channel.name)
                .setDescription(`By ` + user.displayName)
                .setTimestamp()
            //channel.send({ embeds: [embed]});
        });
				if(interaction.channel.topic) {
					await removeRole(client, config.ticket_role_id, interaction.channel.topic);
				}
        interaction.channel.delete();
    }
}

export { onClickCloseTicket }
