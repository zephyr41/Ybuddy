const { SlashCommandBuilder, Permissions } = require('discord.js');

//const filiereNoms = ["CREA", "AUDIOVISUEL", "MARCOM", "3D ANIM", "INFO", "ARCHI"];
const filiereNoms = ["CREA", "AUDIOVISUEL"];
const classeNoms = ["B1", "B2",];
const filiereRolesColors = {
    "B1 CREA": "#FF7F7F", // Rouge clair
    "B1 AUDIOVISUEL": "#7FFF7F", // Vert clair
    "B1 MARCOM": "#FF7FEF", // Rose clair
    "B1 3D ANIM": "#7F7FFF", // Bleu clair
    "B1 INFO": "#7FDBFF", // Bleu clair
    "B1 ARCHI": "#C0A080" // Marron clair
};

module.exports = {
    data: new SlashCommandBuilder()
        .setName('createroles')
        .setDescription('Crée les rôles pour chaque filière et classe'),

    async execute(interaction) {
        const guild = interaction.guild;

        // Récupérer l'ID du rôle "everyone"
        const everyoneRole = guild.roles.everyone;
        const everyoneRoleId = everyoneRole.id;

        // Récupérer les permissions du rôle "everyone"
        const everyonePermissions = await guild.roles.fetch(everyoneRoleId)
            .then(role => role.permissions.toArray());

        for (const filiereNom of filiereNoms) {
            for (const classeNom of classeNoms) {
                const roleName = `${filiereNom} - ${classeNom}`;
                const roleColor = filiereRolesColors[roleName];

                // Vérifier si le rôle existe déjà
                const existingRole = guild.roles.cache.find(role => role.name === roleName);

                // Si le rôle n'existe pas, le créer avec la couleur et les autorisations appropriées
                if (!existingRole) {
                    const createdRole = await guild.roles.create({
                        name: roleName,
                        color: roleColor,
                        reason: 'Création des rôles pour chaque filière et classe',
                    });

                    // Appliquer les permissions du rôle "everyone" au nouveau rôle
                    await createdRole.setPermissions(everyonePermissions);
                }
            }
        }

        await interaction.reply('Rôles créés avec succès.');
    },
};
