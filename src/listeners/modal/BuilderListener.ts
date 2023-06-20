import { EmbedBuilder } from 'discord.js';

async function onDesignerModal(interaction) {
    if (!interaction.isModalSubmit()) return;
    if (interaction.customId !== 'builder_modal') return



}

export { onDesignerModal }