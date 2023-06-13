import { ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } from 'discord.js';

async function showDeveloperModal(interaction) {
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


    // @ts-ignore
    modal.addComponents(new ActionRowBuilder().addComponents(age), new ActionRowBuilder().addComponents(github), new ActionRowBuilder().addComponents(ingame), new ActionRowBuilder().addComponents(links), new ActionRowBuilder().addComponents(languages));
    await interaction.showModal(modal);
}


export { showDeveloperModal };
