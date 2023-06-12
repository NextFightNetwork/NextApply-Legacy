const {EmbedBuilder} = require("discord.js");

async function onDesignerModal(interaction) {
    if (!interaction.isModalSubmit()) return;
    if (interaction.customId !== 'designer_modal') return


}

module.exports = {
    onDesignerModal
};