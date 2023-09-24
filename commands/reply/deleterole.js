const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('deleteroles')
        .setDescription('Supprime tous les rôles sauf Davids et Ybuddy'),

    async execute(interaction) {
        const guild = interaction.guild;

        try {
            // Récupérer tous les rôles du serveur
            const roles = await guild.roles.fetch();

            // Vérifier si des rôles ont été récupérés
            if (!roles) {
                console.log('Aucun rôle à supprimer.');
                await interaction.reply('Aucun rôle à supprimer.');
                return;
            }

            // Faire une boucle sur les rôles
            roles.forEach(async (role) => {
                // Vérifier si le nom du rôle n'est ni "Davids" ni "Ybuddy" et n'est pas "everyone"
                if (role.name !== 'Davids' && role.name !== 'Ybuddy' && role.name !== '@everyone') {
                    // Vérifier si le rôle existe encore
                    const existingRole = guild.roles.cache.get(role.id);
                    if (existingRole) {
                        // Supprimer le rôle
                        await existingRole.delete();
                        console.log(`Rôle supprimé : ${role.name}`);
                    } else {
                        console.log(`Le rôle ${role.name} n'existe plus.`);
                    }
                }
            });

            await interaction.reply('Rôles supprimés avec succès, sauf Davids et Ybuddy.');
        } catch (error) {
            console.error('Erreur lors de la suppression des rôles :', error);
            await interaction.reply('Une erreur s\'est produite lors de la suppression des rôles.');
        }
    },
};
