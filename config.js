module.exports = {
    prefix: ".", // prefix du bot
    welcomeChannel: "", // Channel de bienvenue souhaité
    slashCommands: true, // slashcommands true ou false, comme vous voulez
    colors: {
        main: [0, 110, 255],
        error: [231, 76, 60]
    },
    botstatus: {
        enabled: true, // statut ou non du bot
        status: "dnd", // statut du bot à choisir : (dnd, online, idle, invisible)
        activity_type: "streaming", // Type d'activité à choisir : (watching, listening, playing, streaming)
        activity_text: "compte les invitations", // Texte de l'activité à mettre à écrire par vous.
        activity_url: "https://www.twitch.tv/solaryfortnite" // L'url du stream
    },
    inviteRewards: true, // RewardsInvite à activer ou non
    rewards: [
        {
            invitesNeeded: 10, // Invite voulu pour la première rewards
            roleID: "" // Le role qu'ils auront après avoir fait 10 invites
        }, //Copier collé pour ajouter des invitesrewards
        {
            invitesNeeded: 25,
            roleID: ""
        }
    ],
    welcomeMessage: "{member} a rejoint le serveur. Il a été invité par **{inviter}** qui à maintenant {invites} invites.", // Use {inviter} for who invited the member, {member} for the member, {code} for the invite used, {mention} to mention the inviter, {ID} for the ID of the member, {inviterID} for the inviter's ID, and {invites} for the inviter's invites
    leaveMessage: "{member} a quitté le serveur. Il avait été invité par **${inviter}** qui à maintenant {invites} invites.", // Use {inviter} for who invited the member, {member} for the member, {mention} to mention the inviter, {ID} for the ID of the member, {inviterID} for the inviter's ID, and {invites} for the inviter's invites
    token: ""
}
