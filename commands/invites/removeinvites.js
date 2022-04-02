const { Command } = require('discord-akairo')
const { MessageEmbed } = require('discord.js');
module.exports = class RemoveInvitesCommand extends Command {
    constructor() {
        super('removeInvites', {
            description: {
                content: 'Supprimées une quantitée définie d\'invite.',
                usage: '<member> <amount>'
            },
            category: 'invites',
            clientPermissions: ['EMBED_LINKS'],
            ratelimit: 2,
            args: [
                {
                    id: 'member',
                    type: 'custom-MEMBER',
                    prompt: {
                        start: 'à qui vous voulez prendre des invites ?',
                        retry: 'Cet utilisateur n\'est pas valide.'
                    }
                },
                {
                    id: 'amount',
                    type: 'number',
                    prompt: {
                        start: 'Combien d\'invite vous voulez prendre de cet utilisateur ?',
                        retry: 'Ce n\'est pas un nombre valide.'
                    }
                }
            ],
            userPermissions(message) {
                if(!message.member.roles.cache.some(role => role.name === 'duo')) return 'duo';
                return null;
            }
        });
    };
    async exec(message, {member, amount}) {
        const { client } = this;
        const { invites } = client;
        let embed = new MessageEmbed()
        .setColor(client.config.colors.main)
        .setFooter(client.user.username, client.user.displayAvatarURL({dynamic: true}))
        .setTimestamp();
        let entry = await invites.findOrCreate({where: {discordUser: member.id, guildID: message.guild.id}, defaults: {discordUser: member.id, invites: 0, guildID: message.guild.id}});
        if(entry[0].invites - amount < 0) {
            embed.setColor(client.config.colors.error)
            .setDescription('Vous ne pouvez pas mettre en négatif des invitations.');
            return message.channel.send(embed);
        };
        await entry[0].decrement('invites', {by: amount});
        embed.setDescription(`${amount} invite(s) donnée(s) à ${member.toString()}! Il a maintenant ${entry[0].invites - amount} invites!`);
        return message.channel.send(embed);
    };
};
