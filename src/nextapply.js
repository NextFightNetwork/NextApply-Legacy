const { EmbedBuilder, Client, Events, ModalBuilder, TextInputBuilder, TextInputStyle, GatewayIntentBits, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, ActionRowBuilder } = require('discord.js');
const config = require('../config.json');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

//Modals
const { showContentModal } = require('./modals/contentModal');
const { showBuilderModal } = require('./modals/builderModal');
const { showDesignerModal } = require('./modals/designerModal');
const { showDeveloperModal } = require('./modals/developerModal');

//Listeners
const { onContentModal } = require('./listeners/modal/content');

client.once(Events.ClientReady, c => {
    console.log(`Logged in as ${c.user.tag}`);
    //client.channels.fetch('1117475844231798917').then(channel => sendEmbed(channel));
});

function sendEmbed(channel) {
    const embed = new EmbedBuilder()
        .setColor(0xEB8922)
        .setTitle('NextFight Application')
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

client.on(Events.InteractionCreate, interaction => {
    if (interaction.isStringSelectMenu() && interaction.customId === 'apply') {
        const selectedValue = interaction.values[0];
        if (selectedValue === 'content') {
            showContentModal(interaction);
        }
        if (selectedValue === 'developer') {
            showDeveloperModal(interaction);
        }
        if (selectedValue === 'builder') {
            showBuilderModal(interaction);
        }
        if (selectedValue === 'designer') {
            showDesignerModal(interaction);
        }
    }
});


client.on(Events.InteractionCreate, async interaction => {
    onContentModal(interaction, client);
});



client.login(config.token);