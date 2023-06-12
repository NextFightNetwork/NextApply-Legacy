const {EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder,
    StringSelectMenuBuilder,
    StringSelectMenuOptionBuilder
} = require("discord.js");
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const axios = require('axios');

const contentChannel = "1117847277449511053";

const { createID } = require('../../utils/utils.js');

async function onContentModal(interaction, client) {
    if (!interaction.isModalSubmit()) return;
    if (interaction.customId !== 'content_modal') return

    const ageString = interaction.fields.getTextInputValue('age');
    const twitch = interaction.fields.getTextInputValue('twitch');
    const ingame = interaction.fields.getTextInputValue('ingame');
    var age = Number(ageString);

    if(!age) {
        await sendError(interaction, `${ageString} is not a valid age!`);
        return;
    }
    if(age < 13) {
        await sendError(interaction, "You must be 13+ years old!");
        return;
    }

    if (ingame) {
        try {
            const apiResponse = await axios.get(`https://api.mojang.com/users/profiles/minecraft/${ingame}`);
            await sendSuccess(interaction, age, twitch, ingame, client);
        } catch (error) {
            await sendSuccess(interaction, age, twitch, client);
            //await sendError(interaction, `The account **${ingame}** does not exist!`);
        }
    } else {
        await sendSuccess(interaction);
    }

    //sendSuccess(interaction);

}




async function sendError(interaction, message) {
    await interaction.reply({ embeds: [new EmbedBuilder()
            .setColor(0xcb380c)
            .setTitle('Failed!')
            .setDescription(message)
            .setTimestamp()], ephemeral: true });
}




async function sendSuccess(interaction, age, twitch, ingame, client) {
    const interactionUser = await interaction.guild.members.fetch(interaction.user.id)
    let name = interactionUser.displayName;
    let image = "https://nothinglol";
    if(ingame) {
        name = ingame;
        image = `https://minotar.net/helm/${ingame}`;
    }
    const ticketButton = new ButtonBuilder()
        .setCustomId('content_ticket')
        .setLabel('Open ticket')
        .setStyle(ButtonStyle.Primary);

    const row = new ActionRowBuilder()
        .addComponents(ticketButton);

    const id = createID(8, true);

    await interaction.reply({ components: [row], embeds: [new EmbedBuilder()
            .setColor(0x7ACB0C)
            .setTitle('Success!')
            .setThumbnail('https://media.discordapp.net/attachments/1052241511795937381/1117568280278876210/ezgif-3-f241c47409.gif?width=591&height=456')
            .setDescription('Your application was successfully sent!\nWe will review it as soon as possible.')
            .addFields({ name: ` `, value: `**TICKET ID** #${id}`, inline: false },)
            .setFooter({ text: name, iconURL: image})
            .setTimestamp()], ephemeral: true });

    sendApplicationToChannel(interaction, age, twitch, ingame, id, client, interactionUser);
}

function sendApplicationToChannel(interaction, age, twitch, ingame, id, client, interactionUser) {
    client.channels.fetch(contentChannel).then(channel => sendEmbed(channel, interaction, age, twitch, ingame, id, client, interactionUser));
}

function sendEmbed(channel, interaction, age, twitch, ingame, id, client, interactionUser) {
    const embed = new EmbedBuilder()
        .setColor(0xEB8922)
        .setTitle(`Content Application`)
        .setThumbnail(`https://mineskin.eu/helm/${ingame}`)
        .setDescription(`Created by <@${interactionUser.id}>`)
        .addFields({ name: 'Minecraft name', value: ingame, inline: true },
            { name: 'Age', value: age.toString(), inline: true },
            { name: 'Social media', value: twitch, inline: true },
            { name: `ID \`#${id}\``, value: ` `, inline: false },)
        .setTimestamp()

    channel.send({ embeds: [embed]});
}

module.exports = {
    onContentModal
};