import { EmbedBuilder } from 'discord.js';

async function onDesignerModal(interaction, client) {
    if (!interaction.isModalSubmit()) return;
    if (interaction.customId !== 'designer_modal') return


}

export { onDesignerModal }