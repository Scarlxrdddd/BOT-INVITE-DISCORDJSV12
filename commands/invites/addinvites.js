const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');
module.exports = class AddInvitesCommand extends Command {
    constructor() {
        super('addInvites', {
            description: {
                content: 'Permet d\'ajouter un nombre spécifié d\'invite à quelqu\'un.',
                usage: '<member> <invites>'
            },
            category: 'invites',
            clientPermissions: ['EMBED_LINKS'],
            ratelimit: 2,
            args: [
                {
                    id: 'member',
                    type: 'custom-MEMBER',
                    prompt: {
                        start: 'Combien d\'invitations veux-tu donner à cet utilisateur?',
                        retry: 'Ce n\'est pas un utilisateur valide.'
                    }
                },
                {
                    id: 'amount',
                    type: 'number',
                    prompt: {
                        start: 'Combien d\'invitations veux-tu donner à cet utilisateur?',
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
    async exec(message, {member, amount}) {
        const { client } = this;
        const { invites } = client;
        let embed = new MessageEmbed()
        .setColor(client.config.colors.main)
        .setFooter(client.user.username, client.user.displayAvatarURL({dynamic: true}))
        .setTimestamp();
        let entry = await invites.findOrCreate({where: {discordUser: member.id, guildID: message.guild.id}, defaults: {discordUser: member.id, invites: 0, guildID: message.guild.id}});
        await entry[0].increment('invites', {by: amount});
        embed.setDescription(`${amount} invites viennent d'être ajouté à${member.toString()}! Il a maintenant ${entry[0].invites + amount} invites!`);
        return message.channel.send(embed);
    };
};