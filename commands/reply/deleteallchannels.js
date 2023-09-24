const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('deleteallchannels')
        .setDescription('Supprime tous les canaux sur le serveur'),

    async execute(interaction) {
        const guild = interaction.guild;

        guild.channels.cache.forEach(async (channel) => {
            try {
                await channel.delete();
            } catch (error) {
                console.error(`Erreur lors de la suppression du canal ${channel.name}:`, error);
            }
        });

        await interaction.reply('Tous les canaux ont été supprimés.');
    }
}
