import {ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder, EmbedBuilder} from 'discord.js';

async function showDeveloperModal(interaction) {
    //disable(interaction);
    //return;

    const modal = new ModalBuilder()
        .setCustomId('developer_modal')
        .setTitle('Developer');

    const age = new TextInputBuilder()
        .setCustomId('age')
        .setMinLength(2)
        .setMaxLength(3)
        .setLabel("How old are you?")
        .setRequired(true)
        .setPlaceholder("13+")
        .setStyle(TextInputStyle.Short);

    const github = new TextInputBuilder()
        .setCustomId('github')
        .setLabel("Github or Gitlab")
				.setMaxLength(300)
        .setRequired(false)
        .setPlaceholder("Your Github or Gitlab username/link")
        .setStyle(TextInputStyle.Short);

    const ingame = new TextInputBuilder()
        .setCustomId('ingame')
        .setLabel("Minecraft name")
        .setMaxLength(16)
        .setRequired(false)
        .setStyle(TextInputStyle.Short);

    const links = new TextInputBuilder()
        .setCustomId('links')
        .setLabel("Showcase")
			  .setMaxLength(300)
        .setRequired(false)
        .setPlaceholder("For example a link to your portfolio or SpigotMC page")
        .setStyle(TextInputStyle.Short);

    const languages = new TextInputBuilder()
        .setCustomId('languages')
        .setLabel("Programming languages you know the best:")
        .setRequired(true)
				.setMaxLength(100)
        .setPlaceholder("Java, TypeScript, Rust...")
        .setStyle(TextInputStyle.Short);


    // @ts-ignore
    modal.addComponents(new ActionRowBuilder().addComponents(age), new ActionRowBuilder().addComponents(github), new ActionRowBuilder().addComponents(ingame), new ActionRowBuilder().addComponents(links), new ActionRowBuilder().addComponents(languages));
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


export { showDeveloperModal };
