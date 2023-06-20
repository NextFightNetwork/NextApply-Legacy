import {TextChannel, Client, EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle, ChannelType, User} from 'discord.js';
import config from '../../config.json';

function openTicketUser(user: User, type: string, client: Client, channelName: string, interact) {
    const guild = client.guilds.cache.get('1051758423211003951');
    if (!guild) return;

    guild.channels.create({
        name: channelName,
        type: ChannelType.GuildText,
        parent: null,
        permissionOverwrites: [
            {
                id: guild.roles.everyone,
                deny: ["ViewChannel"]
            },
            {
                id: user.id,
                allow: ["ViewChannel"]
            }, {

                id: config.team_role_id,
                allow: ["ViewChannel"],
            }]
    })
        .then((channel) => {

            if (channel instanceof TextChannel) {

                const close = new ButtonBuilder()
                    .setCustomId('close_ticket')
                    .setLabel('Close')
                    .setStyle(ButtonStyle.Danger);
                const claim = new ButtonBuilder()
                    .setCustomId('claim_ticket')
                    .setLabel('Claim')
                    .setStyle(ButtonStyle.Success);

                const row = new ActionRowBuilder()
                    .addComponents(close, claim);

                channel.send("Ticket created by <@"+user.id+">");
                // @ts-ignore
                channel.send({ components: [row],  embeds: [getEmbed(user, type, client)]});
                interact.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setColor(0x7ACB0C)
                            .setTitle('Success!')
                            .setDescription("Created ticket: <#" + channel.id + ">")
                            .setTimestamp()
                    ],
                    ephemeral: true
                });
            }
        })
        .catch((error) => {
            console.error('Error creating ticket channel:', error);
            interact.reply({
                embeds: [
                    new EmbedBuilder()
                        .setColor(0xFFFE00)
                        .setTitle('Warning!')
                        .setDescription("Something went wrong...")
                        .setTimestamp()
                ],
                ephemeral: true
            });
        });

}

function getEmbed(user: User, type: string, client: Client) {
    let embed;
    switch (type) {
        case "content": {
            embed = new EmbedBuilder()
                .setColor(0xEB8922)
                .setTitle('Application Ticket!')
                .setDescription("This ticket is about the content application of " + user.username)
                .setTimestamp()

            break;
        }
        default: {

        }
    }
    return embed;
}

export { openTicketUser }
