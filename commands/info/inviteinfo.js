const { Command } = require('discord-akairo')
const { MessageEmbed } = require('discord.js');
module.exports = class InviteInfoCommand extends Command {
    constructor() {
        super('inviteInfo', {
            aliases: ['inviteinfo'],
            description: {
                content: 'Obtiens des infos sur l\'invitation',
                usage: '<invite>'
            },
            category: 'info',
            clientPermissions: ['EMBED_LINKS'],
            ratelimit: 2,
            args: [
                {
                    id: 'invite',
                    type: 'invite',
                    prompt: {
                        start: 'Quel invite veux-tu regarder?',
                        retry: 'Ce n\'est pas une invite valide.'
                    }
                }
            ],
            userPermissions(message) {
                if(!message.member.roles.cache.some(role => role.name === 'duo')) return 'duo';
                return null;
            }
        });
    };
    async exec(message, {invite}) {
        const { config } = this.client;
        const embed = new MessageEmbed()
        .setColor(config.colors.main)
        .addFields([
            {
                name: "Channel:",
                value: message.guild.channels.cache.get(invite.channel.id).name,
                inline: true
            },
            {
                name: "\u200b",
                value: "\u200b",
                inline: true
            },
            {
                name: "Inviteur:",
                value: invite.inviter.tag,
                inline: true
            },
            {
                name: "Expire le:",
                value: `${invite.expiresAt ? invite.expiresAt.toLocaleString(undefined, {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', timeZoneName: 'short'}) : "Unknown"}`,
                inline: true
            },
            {
                name: "\u200b",
                value: "\u200b",
                inline: true
            },
            {
                name: "Utilisations:",
                value: invite.uses || "Inconnu ou aucune",
                inline: true
            }
        ])
        .setFooter(this.client.user.username, this.client.user.displayAvatarURL({dynamic: true}))
        .setTimestamp();
        message.channel.send(embed);
    };
};