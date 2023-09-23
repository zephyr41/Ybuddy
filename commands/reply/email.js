const { ActionRowBuilder, ButtonBuilder, ButtonStyle, SlashCommandBuilder, MessageCollector } = require('discord.js');
const generateCode = require('../../generateCode.js');
const sendEmail = require('../../sendmail.js');

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
        const linkEmail = new ButtonBuilder()
            .setLabel('Outlook')
            .setURL('https://outlook.office.com/mail/inbox')
            .setStyle(ButtonStyle.Link);

        const row = new ActionRowBuilder()
            .addComponents(linkEmail);

        const prenom = interaction.options.getString('prenom');
        const nom = interaction.options.getString('nom');

        const code = generateCode();
        console.log(`Code de confirmation pour ${prenom} ${nom} : ${code}`);
        const email = `${prenom}.${nom}@ynov.com`;

        // Demander le code de confirmation
        await interaction.reply({
            content: `Email envoyé à ${email}`,
            components: [row],
        });

        const collectorFilter = m => m.content.includes('discord');
        const collector = interaction.channel.createMessageCollector({ filter: collectorFilter, time: 15000 });

        collector.on('collect', m => {
            console.log(`Collected ${m.content}`);
            if (m.content.includes('discord')) {
                // Réagir lorsque le message contient "discord"
                console.log('Message contient "discord":', m.content);
                // Ajoutez ici votre logique pour réagir au message contenant "discord"
            }
        });

        collector.on('end', collected => {
            console.log(`Collected ${collected.size} items`);
        });
    }
};
