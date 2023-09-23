const { SlashCommandBuilder, MessageCollector } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('testcollector')
        .setDescription('Teste un collecteur de messages'),

    async execute(interaction) {
        console.log('Commande testcollector appelée');
        await interaction.reply('Veuillez envoyer un message pour tester le collecteur.');
        
        const collectorFilter = m => m.author.id === interaction.channel.id;
        const collector = new MessageCollector(interaction.channel, collectorFilter, { time: 30_000 });

        collector.on('collect', m => {
            console.log(`Message collecté : ${m.content}`);
        });

        collector.on('end', collected => {
            console.log(`Nombre de messages collectés : ${collected.size}`);
        });
    },
};

