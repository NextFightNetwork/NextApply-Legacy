import { openTicketUser } from '../../../utils/ticket/TicketOpenUser';
import { createID } from '../../../utils/Utils';
import {Channel, EmbedBuilder} from "discord.js";

async function onClickOpenTicketUser(interaction, client) {
    if (!interaction.isButton()) return;
		const user = await client.users.fetch(interaction.user.id);
    if (interaction.customId === 'content_ticket_open_user') {
        openTicketUser(user,"content", client, user.username + "-" + createID(4, true).toLowerCase(), interaction);
    }
}

export { onClickOpenTicketUser }
