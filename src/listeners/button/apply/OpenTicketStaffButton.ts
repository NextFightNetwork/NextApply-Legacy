import { openTicketStaff } from '../../../utils/ticket/TicketOpenStaff';
import { createID } from '../../../utils/Utils';
import {Channel, EmbedBuilder} from "discord.js";

async function onClickOpenTicketStaff(interaction, client) {
    if (!interaction.isButton()) return;
    const staff = await interaction.guild.members.fetch(interaction.user.id);
    if (interaction.customId === 'content_ticket_open_staff') {
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
        openTicketStaff(staff, user, "content", client, user.username + "-" + createID(4, true).toLowerCase(), interaction);
    }
}

export { onClickOpenTicketStaff }
