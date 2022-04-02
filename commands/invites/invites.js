const { Command, Flag } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');

module.exports = class inviteCommand extends Command {
    constructor() {
        super('invite', {
            aliases: ['invites'],
            category: 'invites',
            description: {
                content: "Cette commande vous permet d'ajouter, de reset, de retirer et de montrer les invitations. \n\nadd - permet d'ajouter un nombre défini d'invitation.\nremove - permet de retirer un nombre défini d'invite.\nreset - reset toutes les invitations du serveur.\nshow - permet de montrer toutes les invitations d'une personne mentionnée ou les votres.",
                usage: "<add/remove/reset/[show]> [utilisateur] [nombre]"
            },
            *args() {
                const method = yield {
                    type: [ 
                        ['addInvites', 'add'],
                        ['removeInvites', 'remove'],
                        ['showInvites', 'show'],
                        ['resetInvites', 'reset']
                    ],
                    default: "showInvites"
                };
                return Flag.continue(method);
            }
        });
    };
};

module.exports.slashCommand = async (client, interaction, args, respond) => {
    const { invites } = client;
    let usage = args[0].name;
    args = args[0].options;
    if(usage === 'add') {
        const member = await interaction.guild.members.fetch(args[0].value);
        const amount = args[1].value;
        interaction.member = await interaction.guild.members.fetch(interaction.member.user.id);
        if(!interaction.member.roles.cache.some(role => role.name === 'duo')) client.handler.emit('missingPermissions', respond, client.handler.findCommand('invites'), 'user', 'duo');
        let entry = await invites.findOrCreate({where: {discordUser: member.id, guildID: interaction.guild.id}, defaults: {discordUser: member.id, invites: 0, guildID: interaction.guild.id}});
        await entry[0].increment('invites', {by: amount});
        let embed = new MessageEmbed()
        .setColor(client.config.colors.main)
        .setDescription(`${amount} invite(s) donnée(s) à ${member.toString()}! Il a maintenant ${entry[0].invites + amount} invites!`)
        .setFooter(client.user.username, client.user.displayAvatarURL({dynamic: true}))
        .setTimestamp();
        return respond({embeds: [embed]});
    };
    if(usage === 'show') {
        const embed = new MessageEmbed()
        .setFooter(client.user.username, client.user.displayAvatarURL({dynamic: true}))
        .setTimestamp()
        .setColor(client.config.colors.main);
        let toLookup;
        if(!args) {
            toLookup = await interaction.guild.members.fetch(interaction.member.user.id);
        } else {
            toLookup = await interaction.guild.members.fetch(args[0].value);
        };
        let foc = await invites.findOrCreate({where: {discordUser: toLookup.id, guildID: interaction.guild.id}, defaults: {discordUser: toLookup.id, invites: 0, guildID: interaction.guild.id}});
        embed.setTitle(`**${toLookup.displayName}**`)
        .setDescription(`${toLookup.toString()} a **${foc[0].invites ? foc[0].invites : '0'}** invites!`);
        return respond({embeds: [embed]});
    };
    if(usage === 'remove') {
        const member = await interaction.guild.members.fetch(args[0].value);
        const amount = args[1].value;
        interaction.member = await interaction.guild.members.fetch(interaction.member.user.id);
        if(!interaction.member.roles.cache.some(role => role.name === 'duo')) client.handler.emit('missingPermissions', respond, client.handler.findCommand('invites'), 'user', 'duo');
        let embed = new MessageEmbed()
        .setColor(client.config.colors.main)
        .setFooter(client.user.username, client.user.displayAvatarURL({dynamic: true}))
        .setTimestamp();
        let entry = await invites.findOrCreate({where: {discordUser: member.id, guildID: interaction.guild.id}, defaults: {discordUser: member.id, invites: 0, guildID: interaction.guild.id}});
        if(entry[0].invites - amount < 0) {
            embed.setColor(client.config.colors.error)
            .setDescription('Tu ne peux pas pas mettre des invitations en négatif.');
            return respond({embeds: [embed]});
        };
        await entry[0].decrement('invites', {by: amount});
        embed.setDescription(`${amount} invite(s) donnée(s) à ${member.toString()}! Il a maintenant ${entry[0].invites - amount} invites!`);
        return respond({embeds: [embed]});
    };
};