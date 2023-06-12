const { ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require('discord.js');

async function showDesignerModal(interaction) {
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

module.exports = {
    showDesignerModal
};