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
        await interaction.reply("Veuillez entrer le code de confirmation que vous avez reçu par mail");
        console.log(interaction.channel.id)
        const collectorFilter = m => m.author.id === interaction.user.id;

        const collector = new MessageCollector(interaction.channel, collectorFilter, { time: 20_000 });


        
        collector.on('collect', async m => {
            console.log(`Message collecté : `);
            // Ajoutez ici votre logique pour réagir au message
            await interaction.followUp(`Vous avez répondu : ${m.content}`);
        });
        
        collector.on('end', collected => {
            console.log(`Nombre de messages collectés : ${collected.size}`);
        });

    }
    
}
