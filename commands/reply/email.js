const { ActionRowBuilder, ButtonBuilder, ButtonStyle, SlashCommandBuilder, MessageCollector } = require('discord.js');
const generateCode = require('../../GenerateCode.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('email')
        .setDescription('Permet de confirmer votre email')
        .addStringOption(option => option
            .setName('prenom')
            .setDescription('Votre prénom')
            .setRequired(true)
        )
        .addStringOption(option => option
            .setName('nom')
            .setDescription('Votre nom')
            .setRequired(true)
        ),

    async execute(interaction) {
        const prenom = interaction.options.getString('prenom');
        const nom = interaction.options.getString('nom');

        const code = generateCode();  // Generate a new confirmation code
        console.log(`Code de confirmation pour ${prenom} ${nom} : ${code}`);
        const email = `${prenom}.${nom}@ynov.com`;

        const collectorFilter = response => {
            return response.content === code.toLowerCase();  // Compare the user's response to the confirmation code
        };


        interaction.reply({ content: "Veuillez entrer le code de vérification :", fetchReply: true })
            .then(() => {
                interaction.channel.awaitMessages({ filter: collectorFilter, max: 1, time: 10000, errors: ['time'] })
                    .then(collected => {
                        interaction.followUp(`${collected.first().author} a correctement répondu au code de confirmation!`);
                    })
                    .catch(collected => {
                        interaction.followUp('Il semble que personne n\'ait entré le bon code de confirmation.');
                    });
            })
            .catch(error => {
                console.error(error);
                interaction.followUp('Une erreur est survenue lors de l\'envoi du message.');
            });
    }
};