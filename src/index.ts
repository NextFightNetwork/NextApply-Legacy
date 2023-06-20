import { EmbedBuilder, Client, Events, ActivityType, ModalBuilder, TextInputBuilder, TextInputStyle, GatewayIntentBits, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, ActionRowBuilder } from 'discord.js';
import config from './config.json';

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

//Modals
import { showContentModal } from './modals/ContentModal';
import { showBuilderModal } from './modals/BuilderModal';
import { showDesignerModal } from './modals/DesignerModal';
import { showDeveloperModal } from './modals/DeveloperModal';

//Listeners
import { onContentModal } from './listeners/modal/ContentListener';

//Button Listeners
import { onClickOpenTicketStaff } from './listeners/button/apply/OpenTicketStaffButton';
import { onClickCloseTicket } from './listeners/button/ticket/CloseTicket';
import { onClickClaimTicket } from './listeners/button/ticket/ClaimTicket';
import { onClickDeclineContent } from './listeners/button/apply/DeclineContent';
client.once(Events.ClientReady, c => {
	console.log(`Logged in as ${c.user.tag}`);
	client.user.setPresence({
		activities: [{ name: `your applications`, type: ActivityType.Watching }],
		status: 'dnd',
	});
	client.channels.fetch(config.channel_id).then(channel => sendEmbed(channel));
});

function sendEmbed(channel) {
	const embed = new EmbedBuilder()
		.setColor(0xEB8922)
		.setTitle(config.application_name)
		.setThumbnail('https://media.discordapp.net/attachments/1052241511795937381/1117537388172943451/animapply.gif?width=625&height=625')
		.setDescription('Please select the role you want to apply for from the dropdown menu below')
		.setTimestamp()

	const select = new StringSelectMenuBuilder()
		.setCustomId('apply')
		.setPlaceholder('Click to select!')
		.addOptions(
			new StringSelectMenuOptionBuilder()
				.setLabel('Content')
				.setDescription('Apply for content and content+')
				.setEmoji('1117513342563663945')
				.setValue('content'),
			new StringSelectMenuOptionBuilder()
				.setLabel('Developer')
				.setDescription('Apply for developer')
				.setEmoji('1117505982025699440')
				.setValue('developer'),
			new StringSelectMenuOptionBuilder()
				.setLabel('Builder')
				.setDescription('Apply for builder')
				.setEmoji('1117506724950192168')
				.setValue('builder'),
			new StringSelectMenuOptionBuilder()
				.setLabel('Designer')
				.setDescription('Apply for designer')
				.setEmoji('1117511332321841202')
				.setValue('designer'),
			);

	const row = new ActionRowBuilder()
		.addComponents(select);

	channel.send({ embeds: [embed], components: [row] });
}

client.on(Events.InteractionCreate, interaction => {
	if (interaction.isStringSelectMenu() && interaction.customId === 'apply') {
		const selectedValue = interaction.values[0];
		if (selectedValue === 'content') {
			showContentModal(interaction);
		}
		if (selectedValue === 'developer') {
			showDeveloperModal(interaction);
		}
		if (selectedValue === 'builder') {
			showBuilderModal(interaction);
		}
		if (selectedValue === 'designer') {
			showDesignerModal(interaction);
		}
	}
});

client.on(Events.InteractionCreate, async interaction => {
	onContentModal(interaction, client);
	onClickOpenTicketStaff(interaction, client);
	onClickCloseTicket(interaction, client);
	onClickClaimTicket(interaction, client);
	onClickDeclineContent(interaction, client);
});

client.login(config.token);