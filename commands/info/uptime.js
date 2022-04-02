const { Command } = require('discord-akairo')
const { MessageEmbed } = require('discord.js')
const ms = require('ms')
module.exports = class UptimeCommand extends Command {
    constructor() {
        super('uptime', {
            aliases: ['uptime', 'u'],
            description: {
                content: 'Envoie le temps que le bot est en ligne.'
            },
            category: 'info',
            clientPermissions: ['EMBED_LINKS'],
            ratelimit: 2
        });
    };
    exec(message) {
        let embed = new MessageEmbed(this.client.config.colors.main)
        .setColor(39423)
        .setDescription(`Le bot est en ligne depuis ${ms(this.client.uptime)}`)
        .setFooter(this.client.user.username, this.client.user.displayAvatarURL())
        .setTimestamp();
        message.channel.send(embed);
    };
};

module.exports.slashCommand = async (client, interaction, args, respond) => {
    let embed = new MessageEmbed()
    .setColor(client.config.colors.main)
    .setDescription(`Le bot est en ligne depuis ${ms(client.uptime)}`)
    .setFooter(client.user.username, client.user.displayAvatarURL())
    .setTimestamp();
    respond({embeds: [embed]});
};