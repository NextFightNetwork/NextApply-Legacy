const { EmbedBuilder, Client, Events, ModalBuilder, TextInputBuilder, TextInputStyle, GatewayIntentBits, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, ActionRowBuilder } = require('discord.js');
const config = require('../config.json');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

//Modals
const { showContentMenu } = require('./modals/contentModal');

client.once(Events.ClientReady, c => {
    console.log(`Logged in as ${c.user.tag}`);
    client.channels.fetch('1117475844231798917').then(channel => sendEmbed(channel));
});


function sendEmbed(channel) {
    const embed = new EmbedBuilder()
        .setColor(0xEB8922)
        .setTitle('NextFight Application')
        .setThumbnail('https://media.discordapp.net/attachments/1052241511795937381/1117537388172943451/animapply.gif?width=625&height=625')
        .setDescription('Please select the role you want to apply for from the dropdown menu below')
        /*.addFields(
            { name: 'You can apply for', value: '- Content \n- Developer \n- Builder' },
        )*/
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
            showContentMenu(interaction);
        }
        if (selectedValue === 'developer') {
            showDeveloperMenu(interaction);
        }
        if (selectedValue === 'builder') {
            showBuilderMenu(interaction);
        }
        if (selectedValue === 'designer') {
            showDesignerMenu(interaction);
        }
    }
});

async function showDeveloperMenu(interaction) {
    const modal = new ModalBuilder()
        .setCustomId('developer_modal')
        .setTitle('Developer');

    const age = new TextInputBuilder()
        .setCustomId('age')
        .setMinLength(2)
        .setMaxLength(3)
        .setLabel("How old are you?")
        .setRequired(true)
        .setPlaceholder("14+")
        .setStyle(TextInputStyle.Short);

    const github = new TextInputBuilder()
        .setCustomId('github')
        .setLabel("Github or Gitlab")
        .setRequired(false)
        .setPlaceholder("Your Github or Gitlab name/link")
        .setStyle(TextInputStyle.Short);

    const ingame = new TextInputBuilder()
        .setCustomId('ingame')
        .setLabel("Minecraft name")
        .setMaxLength(16)
        .setMinLength(3)
        .setRequired(false)
        .setStyle(TextInputStyle.Short);

    const links = new TextInputBuilder()
        .setCustomId('links')
        .setLabel("Showcase projects")
        .setMaxLength(16)
        .setMinLength(3)
        .setRequired(false)
        .setPlaceholder("For example Github or SpigotMC link if you have")
        .setStyle(TextInputStyle.Short);

    const languages = new TextInputBuilder()
        .setCustomId('languages')
        .setLabel("Which programming languages do you know?")
        .setMaxLength(16)
        .setMinLength(3)
        .setRequired(false)
        .setPlaceholder("Java, TypeScript, JavaScript, Rust...")
        .setStyle(TextInputStyle.Short);

    modal.addComponents(new ActionRowBuilder().addComponents(age), new ActionRowBuilder().addComponents(github), new ActionRowBuilder().addComponents(ingame), new ActionRowBuilder().addComponents(links), new ActionRowBuilder().addComponents(languages));

    await interaction.showModal(modal);
}

async function showBuilderMenu(interaction) {
    const modal = new ModalBuilder()
        .setCustomId('builder_modal')
        .setTitle('Builder');

    const age = new TextInputBuilder()
        .setCustomId('age')
        .setMinLength(2)
        .setMaxLength(3)
        .setLabel("How old are you?")
        .setRequired(true)
        .setPlaceholder("13+")
        .setStyle(TextInputStyle.Short);

    const tools = new TextInputBuilder()
        .setCustomId('github')
        .setLabel("With which tools are you familiar?")
        .setRequired(false)
        .setPlaceholder("WorldEdit, goBrush...")
        .setStyle(TextInputStyle.Short);

    const ingame = new TextInputBuilder()
        .setCustomId('ingame')
        .setLabel("Minecraft name")
        .setMaxLength(16)
        .setMinLength(3)
        .setRequired(false)
        .setStyle(TextInputStyle.Short);

    const best = new TextInputBuilder()
        .setCustomId('best')
        .setLabel("What can you build the best?")
        .setRequired(false)
        .setPlaceholder("Terrain, houses, trees...")
        .setStyle(TextInputStyle.Paragraph);

    modal.addComponents(new ActionRowBuilder().addComponents(age), new ActionRowBuilder().addComponents(tools), new ActionRowBuilder().addComponents(ingame), new ActionRowBuilder().addComponents(best));

    await interaction.showModal(modal);
}

async function showDesignerMenu(interaction) {
    const modal = new ModalBuilder()
        .setCustomId('designer_modal')
        .setTitle('Designer');

    const age = new TextInputBuilder()
        .setCustomId('age')
        .setMinLength(2)
        .setMaxLength(3)
        .setLabel("How old are you?")
        .setRequired(true)
        .setPlaceholder("13+")
        .setStyle(TextInputStyle.Short);

    const showcase = new TextInputBuilder()
        .setCustomId('showcase')
        .setLabel("Showcase")
        .setRequired(true)
        .setPlaceholder("Link to design you made")
        .setStyle(TextInputStyle.Short);

    const ingame = new TextInputBuilder()
        .setCustomId('ingame')
        .setLabel("Minecraft name")
        .setMaxLength(16)
        .setMinLength(3)
        .setRequired(false)
        .setStyle(TextInputStyle.Short);

    modal.addComponents(new ActionRowBuilder().addComponents(age), new ActionRowBuilder().addComponents(showcase), new ActionRowBuilder().addComponents(ingame));

    await interaction.showModal(modal);
}



client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isModalSubmit()) return;

    if (interaction.customId === 'content_modal') {

        const age = interaction.fields.getTextInputValue('age');
        const twitch = interaction.fields.getTextInputValue('twitch');
        console.log({ age, twitch });
        await interaction.reply({ embeds: [new EmbedBuilder()
                .setColor(0x7ACB0C)
                .setTitle('Success <:checkmark:1117570654921818143>')
                .setThumbnail('https://media.discordapp.net/attachments/1052241511795937381/1117568280278876210/ezgif-3-f241c47409.gif?width=591&height=456')
                .setDescription('Your application was successfully sent!\nWe will review it as soon as possible.')
                .setTimestamp()], ephemeral: true });
    }
});



client.login(config.token);