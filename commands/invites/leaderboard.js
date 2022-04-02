const { Command } = require('discord-akairo')
const { MessageEmbed } = require('discord.js');
module.exports = class LeaderboardCommand extends Command {
    constructor() {
        super('leaderboard', {
            aliases: ['leaderboard', 'lb'],
            description: {
                content: 'Envoie une liste des 10 meilleurs invites.',
                usage: ''
            },
            category: 'invites',
            clientPermissions: ['EMBED_LINKS'],
            ratelimit: 2,
        });
    };
    async exec(message) {
        const { client } = this;
        const { invites } = client;
        const embed = new MessageEmbed()
        .setFooter(client.user.username, client.user.displayAvatarURL({dynamic: true}))
        .setTimestamp()
        .setColor(client.config.colors.main);
        const all = await invites.findAll({order: [['invites', 'DESC']], limit: 10, where: {guildID: message.guild.id}});
        let LB = [];
        await all.forEach(async entry => {
            if(!entry.invites) return;
            LB.push(`${LB.length + 1}. ${(await (client.users.fetch(entry.discordUser))).tag} - ${entry.invites}`);
        });
        if(LB.length === 0) {embed.setDescription('Personne du serveur à des invites.')} else {embed.setDescription(`Voici le top ${LB.length} des inviteurs!\n${LB.join('\n')}`)}
        message.channel.send(embed);
    };
};

module.exports.slashCommand = async (client, interaction, args, respond) => {
    const { invites } = client;
    const embed = new MessageEmbed()
    .setFooter(client.user.username, client.user.displayAvatarURL({dynamic: true}))
    .setTimestamp()
    .setColor(client.config.colors.main);
    const all = await invites.findAll({order: [['invites', 'DESC']], limit: 10, where: {guildID: interaction.guild.id}});
    let LB = [];
    await all.forEach(async entry => {
        if(!entry.invites) return;
        LB.push(`${LB.length + 1}. ${(await (client.users.fetch(entry.discordUser))).tag} - ${entry.invites}`);
    });
    if(LB.length === 0) {embed.setDescription('Personne du serveur n\'a des invites.')} else {embed.setDescription(`Voici le top ${LB.length} des inviteurs!\n${LB.join('\n')}`)}
    respond({embeds: [embed]});
}