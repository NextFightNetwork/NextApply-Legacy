const {EmbedBuilder} = require("discord.js");

async function onDesignerModal(interaction) {
    if (!interaction.isModalSubmit()) return;
    if (interaction.customId !== 'developer_modal') return

}

module.exports = {
    onDesignerModal
};