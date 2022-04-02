const { Command } = require('discord-akairo')
const { MessageEmbed } = require('discord.js');
module.exports = class ResetAllInvitesCommand extends Command {
    constructor() {
        super('resetAllInvites', {
            aliases: ['resetallinvites'],
            description: {
                content: 'Les invitations du serveur sont toutes resets.',
                usage: ''
            },
            category: 'invites',
            clientPermissions: ['EMBED_LINKS'],
            ratelimit: 2,
            args: [
                
            ],
            userPermissions(message) {
                if(!message.member.roles.cache.some(role => role.name === 'duo')) return 'duo';
                return null;
            }
        })
    
        
    };
    async exec(message) {
        const { invites, config } = this.client
        const embed = new MessageEmbed()
            .setColor(config.colors.main)
            .setDescription('Invites supprimées avec succès.');
        await invites.destroy({where: {guildID: message.guild.id}});
        return message.channel.send(embed)
    };
};
