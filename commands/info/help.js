const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');
module.exports = class HelpCommand extends Command {
    constructor() {
        super('help', {
            aliases: ['help', 'h'],
            description: {
                content: 'Affiche une liste de commande ou affiche aussi une aide pour des commandes spécifiques.',
                usage: '[command]'
            },
            category: 'info',
            clientPermissions: ['EMBED_LINKS'],
            ratelimit: 2,
            args: [
                {
                    id: 'command',
                    type: 'commandAlias'
                }
            ]
        });
    };
    exec(message, {command}) { 
        let embed = new MessageEmbed()
        .setColor(this.client.config.colors.main)
        .setTimestamp()
        .setAuthor(this.client.user.username, this.client.user.displayAvatarURL({dynamic: true}));
        const prefix = this.handler.prefix;
        if (!command) {
            embed.setTitle('Voici toutes mes commandes :').setDescription(`Pour plus d'information veuillez faire \`${prefix}help [commande]\`!`);
            this.handler.categories.each((category) => {
                let commands = []
                category.each(command => {
                    if(command.aliases[0]) commands.push(`${prefix}${command.aliases[0]}`)
                })
                embed.addField(category.id.slice(0)[0].toUpperCase() + category.id.slice(1), commands.join(', '));
            });
            return message.channel.send(embed);
        };
        embed.setTitle(command.aliases[0])
        .setDescription('<> est l\'argument requis.\n[] est un argument optionnel.')
        .addField('Utilisation:', `${prefix}${command.aliases[0]}${command.description ? ' ' + command.description.usage : ''}`);
        if(command.aliases.length > 1) embed.addField('Aliases', command.aliases.splice(0).join(', '));
        embed.addField('Description:', command.description.content);
        embed.addField('Owner seulement', command.ownerOnly.toString().slice(0)[0].toUpperCase() + command.ownerOnly.toString().slice(1));
        return message.channel.send(embed);
    };
};

module.exports.slashCommand = async (client, interaction, args, respond) => {
    let embed = new MessageEmbed()
    .setColor(client.config.colors.main)
    .setTimestamp()
    .setAuthor(client.user.username, client.user.displayAvatarURL({dynamic: true}));
    const prefix = client.handler.prefix;
    let command = args;
    if (!command) {
        embed.setTitle('Voici toutes mes commandes!').setDescription(`Pour plus d'information veuillez faire \`${prefix}help [commande]\`!`);
        client.handler.categories.each((category) => {
            let commands = []
            category.each(command => {
                if(command.aliases[0]) commands.push(`${prefix}${command.aliases[0]}`)
            })
            embed.addField(category.id.slice(0)[0].toUpperCase() + category.id.slice(1), commands.join(', '));
        });
        return respond({embeds: [embed]});
    };
    command = await client.handler.findCommand(command[0].value);
    embed.setTitle(command.aliases[0])
    .setDescription('<> est l\'argument requis.\n[] est un argument optionnel.')
    .addField('Utilisation:', `${prefix}${command.aliases[0]}${command.description ? ' ' + command.description.usage : ''}`);
    if(command.aliases.length > 1) embed.addField('Aliases', command.aliases.splice(0).join(', '));
    embed.addField('Description:', command.description.content);
    embed.addField('Owner seulement', command.ownerOnly.toString().slice(0)[0].toUpperCase() + command.ownerOnly.toString().slice(1));
    return respond({embeds: [embed]});
}