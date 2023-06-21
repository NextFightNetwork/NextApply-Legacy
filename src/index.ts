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
import { onClickOpenTicketUser } from "./listeners/button/apply/OpenTicketUserButton";

import { sendEmbed } from './utils/embeds/ApplicationCreateEmbed';

client.once(Events.ClientReady, c => {
	console.log(`Logged in as ${c.user.tag}`);
	client.user.setPresence({
		activities: [{ name: `your applications`, type: ActivityType.Watching }],
		status: 'dnd',
	});
	if(config.send_application_message_on_start) {
		client.channels.fetch(config.application_message_channel_id).then(channel => sendEmbed(channel));
	}
});

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
	onClickOpenTicketUser(interaction, client);
	onClickCloseTicket(interaction, client);
	onClickClaimTicket(interaction, client);
	onClickDeclineContent(interaction, client);
});

client.login(config.token);