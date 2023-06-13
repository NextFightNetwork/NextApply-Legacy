import {TextChannel, Client, EmbedBuilder,  Embed, ChannelType, Channel, User} from 'discord.js';

async function openTicketStaff(staff: User, user: User, type: string, client: Client, channelName: string) {
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
        },
        {
            id: staff.id,
            allow: ["ViewChannel"],
        }, {

            id: "1095773070414844076", // Team role ID
            allow: ["ViewChannel"],

        },{
            id: "1106641978218782792", // Mod role ID
            allow: ["ViewChannel"]
        }]
    })
        .then((channel) => {

            if (channel instanceof TextChannel) {
                //TODO add buttons (close & claim)
                channel.send("Ticket created by <@"+staff.id+"> for the applicant <@"+user.id+">");
                channel.send({ embeds: [getEmbed(staff, user, type, client)] });
                return channel.id;
            }
        })
        .catch((error) => {
            console.error('Error creating ticket channel:', error);
            return null;
        });
    return null;
}

function getEmbed(staff: User, user: User, type: string, client: Client) {
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

export { openTicketStaff }
