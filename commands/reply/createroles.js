const { SlashCommandBuilder } = require('discord.js');

const filiereNoms = ["CREA", "AUDIOVISUEL", "MARCOM", "3D ANIM", "INFO", "ARCHI"];
const filiereRolesColors = {
    "CREA": "#FF7F7F", // Rouge clair
    "AUDIOVISUEL": "#7FFF7F", // Vert clair
    "MARCOM": "#FF7FEF", // Rose clair
    "3D ANIM": "#7F7FFF", // Bleu clair
    "INFO": "#7FDBFF", // Bleu clair
    "ARCHI": "#C0A080" // Marron clair
};

module.exports = {
    data: new SlashCommandBuilder()
        .setName('createroles')
        .setDescription('Crée les rôles pour chaque filière'),

    async execute(interaction) {
        try {
            // Répondre à l'interaction ou différer la réponse
            await interaction.deferReply();

            const guild = interaction.guild;
            const everyoneRole = guild.roles.everyone;
            const everyoneRoleId = everyoneRole.id;
            const everyonePermissions = await guild.roles.fetch(everyoneRoleId)
                .then(role => role.permissions.toArray());

            for (const filiereNom of filiereNoms) {
                const roleName = filiereNom;
                const roleColor = filiereRolesColors[filiereNom];

                const existingRole = guild.roles.cache.find(role => role.name === roleName);

                if (!existingRole) {
                    const createdRole = await guild.roles.create({
                        name: roleName,
                        color: roleColor,
                        reason: 'Création des rôles pour chaque filière',
                        
                    });

                    await createdRole.setPermissions(everyonePermissions);
                }
            }

            // Envoyer une réponse
            await interaction.followUp('Rôles créés avec succès.');
        } catch (error) {
            console.error('Erreur lors de la création des rôles :', error);
            // Envoyer une réponse en cas d'erreur
            await interaction.followUp('Une erreur s\'est produite lors de la création des rôles.');
        }
    },
};
