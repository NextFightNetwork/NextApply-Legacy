import { openTicketStaff } from '../../../../utils/ticket/TicketOpenStaff';
import { createID } from '../../../../utils/Utils';
import {Channel, Embed, EmbedBuilder} from "discord.js";

async function onClickDeclineContent(interaction, client) {
    if (!interaction.isButton()) return;
    const staff = await interaction.guild.members.fetch(interaction.user.id);
    if (interaction.customId === 'decline_content_request') {
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

        interaction.reply({ embeds: [new EmbedBuilder()
                .setColor(0xcb380c)
                .setTitle("Content rejection!")
                .setDescription("<@"+interaction.user.id +">" + " rejected the request by <@" + user.id + ">!")
                .setTimestamp()],});
        interaction.message.delete();
    }
}

export { onClickDeclineContent }
