const { ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require('discord.js');

async function showBuilderModal(interaction) {
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

module.exports = {
    showBuilderModal
};