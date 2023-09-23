const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('testcollector')
        .setDescription('Teste un collecteur de messages'),

    async execute(interaction) {
        console.log('Commande testcollector appelée');
        await interaction.reply('Veuillez envoyer un message pour tester le collecteur.');

        const collectorFilter = () => true;  // Le filtre retourne toujours true pour collecter tous les messages
        const collector = interaction.channel.createMessageCollector({ filter: collectorFilter, time: 15_000 });

        collector.on('collect', m => {
            console.log(`Collected ${m.content}`);
            // Ajoutez ici votre logique pour réagir à chaque message collecté
        });

        collector.on('end', collected => {
            console.log(`Collected ${collected.size} items`);
        });

        // Ajoutez une gestionnaire d'erreurs pour voir s'il y a des erreurs dans le collecteur
        collector.on('error', error => {
            console.error('Erreur dans le collecteur :', error);
        });
    },
};