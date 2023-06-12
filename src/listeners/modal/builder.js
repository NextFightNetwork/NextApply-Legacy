const {EmbedBuilder} = require("discord.js");

async function onDesignerModal(interaction) {
    if (!interaction.isModalSubmit()) return;
    if (interaction.customId !== 'builder_modal') return

}

module.exports = {
    onBuilderModal
};