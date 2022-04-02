let commands = [
    {
        name: 'uptime',
        description: 'Permet de savoir combien de temps le bot est ON.'
    },
    {
        name: 'test',
        description: 'test.'
    },
    {
        name: 'invites',
        description: 'Ajoute, supprime, reset et montre combien d\'invites tu as.',
        options: [
            {
                name: 'show',
                description: 'Permet de montrer combien d\'invite une personne a.',
                type: 1,
                options: [
                    {
                        name: 'member',
                        description: 'member permet de voir combien d\'invites à la personne, si il n\'y a rien il montre les votres.',
                        type: 6,
                        required: false
                    }
                ]
            },
            {
                name: 'add',
                description: 'Permet d\'ajouter des invites à un utilisateur.',
                type: 1,
                options: [
                    {
                        name: 'member',
                        description: 'Membre à qui on veut ajouter les invitations.',
                        type: 6,
                        required: true
                    },
                    {
                        name: 'amount',
                        description: 'Nombre d\'invites à ajouter.',
                        type: 4,
                        required: true
                    }
                ]
            },
            {
                name: 'remove',
                description: 'Supprime les invites d\'un membre.',
                type: 1,
                options: [
                    {
                        name: 'member',
                        description: 'The member to remove invites from.',
                        type: 6,
                        required: true
                    },
                    {
                        name: 'amount',
                        description: 'The amount of invites to remove.',
                        type: 4,
                        required: true
                    }
                ]
            },
            {
                name: 'reset',
                description: 'Supprime toutes les invites d\'une personne.',
                type: 1,
                options: [
                    {
                        name: 'member',
                        description: 'The member to reset the invites of.',
                        type: 6,
                        required: true
                    }
                ]
            },
        ]
    },
    {
        name: 'help',
        description: 'Permet d\'afficher une liste de commande disponible sur le bot.',
        options: [
            {
                name: 'command',
                description: 'Citez une commande afin d\'avoir plus d\'information par rapport à celle-ci',
                type: 3,
                required: false
            }
        ]
    },
    {
        name: 'leaderboard',
        description: 'Envoie une liste avec le top des inviteurs.'
    }
]
const { Client } = require('discord.js')

/**
 * Adds all slash commands to the passed client
 * @param {Client} client - The client to add slash commands to
 */
module.exports.registerCommands = async (client) => {
    let application = await client.fetchApplication();
    for (let i = 0; i < commands.length; i++) {
        setTimeout(async () => {
            let command = commands[i];
            await client.api.applications(application.id).commands.post({data: command});
            if(i + 1 == commands.length) console.log('Registered all the slash commands!');
        }, 3000)
    }
}

/**
 * Deletes all slash commands from the passed client
 * @param {Client} client - The client to remove slash commands from
 */
module.exports.deleteCommands = async (client) => {
    let application = await client.fetchApplication()
    let commands = await client.api.applications(application.id).commands.get()
    commands.forEach(command => {
        client.api.applications(application.id).commands(command.id).delete()
    })
}

module.exports.commands = commands