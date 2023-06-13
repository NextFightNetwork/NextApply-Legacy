import {TextChannel, Client, EmbedBuilder, GuildMember, Embed, ChannelType} from 'discord.js';

function openTicketStaff(staff: GuildMember, user: GuildMember, type: string, client: Client, channelName: string): void {
    const guild = client.guilds.cache.get('1051758423211003951');
    if (!guild) return;

    guild.channels.create({
        name: "hello",
        type: ChannelType.GuildText,
        parent: null,
        permissionOverwrites: [{
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
                channel.send({ embeds: [getEmbed(staff, user, type, client)] });
            }
        })
        .catch((error) => {
            console.error('Error creating ticket channel:', error);
        });
}

function getEmbed(staff: GuildMember, user: GuildMember, type: string, client: Client) {
    let embed;
    switch (type) {
        case "content": {

            break;
        }
        default: {

        }
    }
    return embed;
}

export { openTicketStaff }
