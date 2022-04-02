const { Command } = require('discord-akairo')
const { MessageEmbed } = require('discord.js');
module.exports = class UserInfoCommand extends Command {
    constructor() {
        super('userInfo', {
            aliases: ['userinfo', 'whois'],
            description: {
                content: 'Obtiens des infos sur un utilisateur.',
                usage: '<member>'
            },
            category: 'info',
            clientPermissions: ['EMBED_LINKS'],
            ratelimit: 2,
            args: [
                {
                    id: 'member',
                    type: 'custom-MEMBER',
                    prompt: {
                        start: 'Qui veux-tu regarder ?',
                        retry: 'Ce n\'est pas un utilisateur valide.'
                    }
                }
            ],
            userPermissions(message) {
                if(!message.member.roles.cache.some(role => role.name === 'duo')) return 'duo';
                return null;
            }
        });
    };
    async exec(message, {member}) {
        const { invites, config } = this.client;
        let foc = await invites.findOrCreate({where: {discordUser: member.id, guildID: message.guild.id}, defaults: {discordUser: member.id, invites: 0, guildID: message.guild.id}});
        const embed = new MessageEmbed()
        .setColor(config.colors.main)
        .addFields([
            {
                name: "Inviteur",
                value: `${foc[0].inviter ? (await this.client.users.fetch(foc[0].inviter)).tag : "Inconnu"}`,
                inline: true
            },
            {
                name: "\u200b",
                value: "\u200b",
                inline: true
            },
            {
                name: "Invites",
                value: `${foc[0].invites || "0"}`,
                inline: true
            },
            {
                name: "Crée le",
                value: member.user.createdAt.toLocaleString(undefined, {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', timeZoneName: 'short'}),
                inline: true
            },
            {
                name: "\u200b",
                value: "\u200b",
                inline: true
            },
            {
                name: "A rejoint le",
                value: member.joinedAt.toLocaleString(undefined, {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', timeZoneName: 'short'}),
                inline: true
            }
        ])
        .setThumbnail(member.user.displayAvatarURL({dynamic: true}))
        .setFooter(this.client.user.username, this.client.user.displayAvatarURL({dynamic: true}))
        .setTimestamp();
        message.channel.send(embed);
    };
};