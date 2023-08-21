import { openTicketUser } from '../../../utils/ticket/TicketOpenUser';
import {createID, userHasActiveTickets} from '../../../utils/Utils';
import {Channel, EmbedBuilder} from "discord.js";

async function onClickOpenTicketUser(interaction, client) {
    if (!interaction.isButton()) return;
		const user = await client.users.fetch(interaction.user.id);
    if (interaction.customId === 'ticket_open_user') {

			if(userHasActiveTickets(interaction)) {
				interaction.reply({
					embeds: [
						new EmbedBuilder()
							.setColor(0xFF1A00)
							.setTitle('Failed!')
							.setDescription("You have an active ticket!")
							.setTimestamp()
					],
					ephemeral: true
				});
				return;
			}

        openTicketUser(user,"", client, user.username + "-" + createID(4, true).toLowerCase(), interaction);
    }
}

export { onClickOpenTicketUser }
