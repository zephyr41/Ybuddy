const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('deleteroles')
        .setDescription('Supprime tous les rôles sauf Davids et Ybuddy'),

    async execute(interaction) {
        const guild = interaction.guild;

        try {
            // Déférer la réponse pour indiquer que nous traitons la requête
            await interaction.deferReply();

            // Récupérer tous les rôles du serveur
            const roles = await guild.roles.fetch();

            // Vérifier si des rôles ont été récupérés
            if (!roles) {
                console.log('Aucun rôle à supprimer.');
                await interaction.followUp('Aucun rôle à supprimer.');
                return;
            }

            // Faire une boucle sur les rôles
            for (const role of roles.values()) {
                // Vérifier si le nom du rôle n'est ni "Davids" ni "Ybuddy" et n'est pas "everyone"
                if (role.name !== 'ADmin' && role.name !== 'Ybuddy' && role.name !== '@everyone') {
                    // Vérifier si le rôle existe encore
                    const existingRole = guild.roles.cache.get(role.id);
                    if (existingRole) {
                        // Supprimer le rôle
                        await existingRole.delete();
                        console.log(`Rôle supprimé : ${role.name}`);
                        await interaction.followUp(`Rôle ${role.name} supprimé avec succès, sauf Davids et Ybuddy.`);
                    } else {
                        console.log(`Le rôle ${role.name} n'existe plus.`);
                    }
                }
            }

            await interaction.followUp('Rôles supprimés avec succès, sauf Davids et Ybuddy.');
        } catch (error) {
            console.error('Erreur lors de la suppression des rôles :', error);
            await interaction.followUp('Une erreur s\'est produite lors de la suppression des rôles.');
        }
    },
};
