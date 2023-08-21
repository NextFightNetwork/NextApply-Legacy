import { EmbedBuilder } from 'discord.js';

async function onBuilderModal(interaction, client) {
    if (!interaction.isModalSubmit()) return;
    if (interaction.customId !== 'builder_modal') return



}

export { onBuilderModal }