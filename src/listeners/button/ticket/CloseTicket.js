import { openTicketStaff } from '../../../utils/ticket/TicketOpenStaff';
import { createID } from '../../../utils/Utils';
import {Channel, EmbedBuilder} from "discord.js";

async function onClickCloseTicket(interaction, client) {
    if (!interaction.isButton()) return;
    const user = await interaction.guild.members.fetch(interaction.user.id);
    if (interaction.customId === 'close_ticket') {
        client.channels.fetch("1117847277449511053").then(channel => {
            const embed = new EmbedBuilder()
                .setColor(0xcb380c)
                .setTitle("Deleted #" + interaction.channel.name)
                .setDescription(`By ` + user.displayName)
                .setTimestamp()
            channel.send({ embeds: [embed]});
        });
        interaction.channel.delete();
    }
}

export { onClickCloseTicket }
