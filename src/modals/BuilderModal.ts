import {ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder, EmbedBuilder} from 'discord.js';

async function showBuilderModal(interaction) {

    disable(interaction);
    return;

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

    modal.addComponents(
        new ActionRowBuilder<TextInputBuilder>().addComponents(age),
        new ActionRowBuilder<TextInputBuilder>().addComponents(tools),
        new ActionRowBuilder<TextInputBuilder>().addComponents(ingame),
        new ActionRowBuilder<TextInputBuilder>().addComponents(best)
    );

    await interaction.showModal(modal);
}
async function disable(interaction) {
    await interaction.reply({ embeds: [new EmbedBuilder()
            .setColor(0xFF1A00)
            .setTitle('Sorry!')
            .setDescription('Currently you cannot apply for this role!')
            .setTimestamp()
        ], ephemeral: true });
}

export { showBuilderModal }