import { EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } from 'discord.js';
import axios from 'axios';

const contentChannel = "1117847277449511053";
import { createID } from '../../utils/Utils';

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
        await sendError(interaction, "You must be at least 13 years old!");
        return;
    }

    if (ingame) {
        try {
            const apiResponse = await axios.get(`https://api.mojang.com/users/profiles/minecraft/${ingame}`);
            await sendSuccess(interaction, age, twitch, client, ingame);
        } catch (error) {
            //await sendSuccess(interaction, age, twitch, client);
            await sendError(interaction, `The account **${ingame}** does not exist!`);
        }
    } else {
        await sendSuccess(interaction, age, twitch, client, null);
    }
}

async function sendError(interaction, message) {
    await interaction.reply({ embeds: [new EmbedBuilder()
            .setColor(0xcb380c)
            .setTitle('Failed!')
            .setDescription(message)
            .setTimestamp()], ephemeral: true });
}


async function sendSuccess(interaction, age, twitch, client, ingame) {
    const interactionUser = await interaction.guild.members.fetch(interaction.user.id)
    let name = interactionUser.displayName;
    let image = "https://media.discordapp.net/attachments/1052241511795937381/1099990211619979354/Neues_Projekt_39.png?width=670&height=670";
    if(ingame) {
        name = ingame;
        image = `https://minotar.net/helm/${ingame}.png`;
    }
    const ticketButton = new ButtonBuilder()
        .setCustomId('content_ticket_open_user')
        .setLabel('Open ticket')
        .setStyle(ButtonStyle.Primary);

    const row = new ActionRowBuilder()
        .addComponents(ticketButton);

    const id = createID(8, true);

    try {
        await interaction.reply({ components: [row], embeds: [new EmbedBuilder()
                .setColor(0x7ACB0C)
                .setTitle('Success!')
                .setThumbnail('https://media.discordapp.net/attachments/1052241511795937381/1117568280278876210/ezgif-3-f241c47409.gif?width=591&height=456')
                .setDescription('Your application was successfully sent!\nWe will review it as soon as possible.')
                .addFields({ name: ` `, value: `**APPLICATION ID** #${id}`, inline: false },)
                .setFooter({ text: name, iconURL: image})
                .setTimestamp()], ephemeral: true });
    } catch (error) {
        await interaction.reply({ components: [row], embeds: [new EmbedBuilder()
                .setColor(0x7ACB0C)
                .setTitle('Success!')
                .setThumbnail('https://media.discordapp.net/attachments/1052241511795937381/1117568280278876210/ezgif-3-f241c47409.gif?width=591&height=456')
                .setDescription('Your application was successfully sent!\nWe will review it as soon as possible.')
                .addFields({ name: ` `, value: `**APPLICATION ID** #${id}`, inline: false },)
                .setTimestamp()
                .setFooter({ text: interactionUser.displayName })
            ], ephemeral: true });
    }

    sendApplicationToChannel(interaction, age, twitch, ingame, id, client, interactionUser);
}

function sendApplicationToChannel(interaction, age, twitch, ingame, id, client, interactionUser) {
    client.channels.fetch(contentChannel).then(channel => sendEmbed(channel, interaction, age, twitch, ingame, id, client, interactionUser));
}

function sendEmbed(channel, interaction, age, twitch, ingame, id, client, interactionUser) {
    let name = ingame;
    let image = `https://mineskin.eu/helm/${ingame}`;
    if(!ingame) {
        name = "_No name found!_"
        image = "https://media.discordapp.net/attachments/1052241511795937381/1117897652542119936/Neues_Projekt_91_1.png?width=625&height=625";
    }

    const embed = new EmbedBuilder()
        .setColor(0xEB8922)
        .setTitle(`Content Application`)
        .setThumbnail(image)
        .setDescription(`Created by <@${interactionUser.id}>`)
        .addFields({ name: 'Minecraft name', value: name, inline: true },
            { name: 'Age', value: age.toString(), inline: true },
            { name: 'Social media', value: twitch, inline: true },
            { name: `ID \`#${id}\``, value: ` `, inline: false },
            { name: ` `, value: `<@&1117885857760817162>`, inline: false },)
        .setTimestamp()


    const decline = new ButtonBuilder()
        .setCustomId('decline_content_request')
        .setLabel('Decline')
        .setStyle(ButtonStyle.Danger);
    const accept_content = new ButtonBuilder()
        .setCustomId('accept_content')
        .setLabel('Accept Content')
        .setStyle(ButtonStyle.Success);
    const accept_content_plus = new ButtonBuilder()
        .setCustomId('accept_content_plus')
        .setLabel('Accept Content+')
        .setStyle(ButtonStyle.Success);
    const open_ticket = new ButtonBuilder()
        .setCustomId('content_ticket_open_staff')
        .setLabel('Open ticket')
        .setStyle(ButtonStyle.Primary);

    const row = new ActionRowBuilder()
        .addComponents(decline,accept_content, accept_content_plus, open_ticket);

    channel.send({ components: [row],  embeds: [embed]});
}

export { onContentModal }