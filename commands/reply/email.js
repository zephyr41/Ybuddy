const { ActionRowBuilder, ButtonBuilder, ButtonStyle, SlashCommandBuilder, MessageCollector,StringSelectMenuBuilder,StringSelectMenuOptionBuilder  } = require('discord.js');
const generateCode = require('../../GenerateCode.js');
const sendEmail = require('../../sendmail.js');
const verificationCode = false
module.exports = {
    data: new SlashCommandBuilder()
        .setName('email')
        .setDescription('Permet de confirmer votre email')
        .addStringOption(option => option
            .setName('prenom')
            .setDescription('Votre prénom')
            .setRequired(true)
        ),
        // .addStringOption(option => option
        //     .setName('nom')
        //     .setDescription('Votre nom')
        //     .setRequired(true)
        // ),

    async execute(interaction) {
        const prenom = interaction.options.getString('prenom');
        const nom = interaction.options.getString('nom');

        const code = generateCode();  // Generate a new confirmation code
        console.log(`Code de confirmation pour ${prenom} ${nom} : ${code}`);
        const email = `${prenom}.${nom}@ynov.com`;
        console.log(`Email de confirmation pour ${prenom} ${nom} : ${email}`);
       // sendEmail(email, code);  // Send the confirmation code to the user's email
        const collectorFilter = response => {
            return response.content === code.toLowerCase();  // Compare the user's response to the confirmation code
        };


        interaction.reply({ content: "Veuillez entrer le code de vérification :", fetchReply: true })
            .then(() => {
                interaction.channel.awaitMessages({ filter: collectorFilter, max: 1, time: 30000, errors: ['time'] })
                    .then(collected => {
                        interaction.followUp(`${collected.first().author} a correctement répondu au code de confirmation!`);
                        if (interaction.isChatInputCommand()) {
        
                            const select = new StringSelectMenuBuilder()
                                .setCustomId('starter')
                                .setPlaceholder('Quelle est ta filière ?')
                                .addOptions(
                                    new StringSelectMenuOptionBuilder()
                                        .setLabel('Création & Design')
                                        .setDescription('Si tu prend le chemin créatif')
                                        .setValue('creationDesign'),
                
                                    new StringSelectMenuOptionBuilder()
                                        .setLabel('Audiovisuel')
                                        .setDescription('Si t\'es en route pour devenir le futur Christopher Nolan')
                                        .setValue('audiovisuel'),
                
                                    new StringSelectMenuOptionBuilder()
                                        .setLabel('Marketing & Communication')
                                        .setDescription('Si tu veux devenir le prochain Steve Jobs')
                                        .setValue('marketingCommunication'),
                
                                    new StringSelectMenuOptionBuilder()
                                        .setLabel('3d & VFX')
                                        .setDescription('Si tu veux crée le prochain AAA')
                                        .setValue('3dVFX'),
                
                                    new StringSelectMenuOptionBuilder()
                                        .setLabel('Informatique')
                                        .setDescription('Si tu veux devenir un crack en code ')
                                        .setValue('informatique'),
                
                                    new StringSelectMenuOptionBuilder()
                                        .setLabel('Architecture')
                                        .setDescription('Si tu veux devenir le prochain Frank Lloyd Wright')
                                        .setValue('architecture'),
                                );
                            // liste des menus 2 pour choisir la filière 
                            const select_class = new StringSelectMenuBuilder()
                                .setCustomId('Classynov')
                                .setPlaceholder('En quelle année es-tu ?')
                                .addOptions(
                                    new StringSelectMenuOptionBuilder()
                                        .setLabel('B1')
                                        .setValue('b1'),
                
                                    new StringSelectMenuOptionBuilder()
                                        .setLabel('B2')
                                        .setValue('b2'),
                
                                    new StringSelectMenuOptionBuilder()
                                        .setLabel('B3')
                                        .setValue('3emeAnnee'),
                
                                    new StringSelectMenuOptionBuilder()
                                        .setLabel('M1')
                                        .setValue('m1'),
                
                                    new StringSelectMenuOptionBuilder()
                                        .setLabel('M2')
                                        .setValue('m2'),
                                );
                
                            // met les composants dans une variable
                            const row = new ActionRowBuilder()
                                .addComponents(select);
                
                            const row2 = new ActionRowBuilder()
                                .addComponents(select_class);
                
                            const buttonEmailConfirm = new ButtonBuilder()
                                .setCustomId('confirmEmail')
                                .setLabel('Cliquez ici pour entrer votre adresse email')
                                .setStyle(ButtonStyle.Primary);
                
                           
                
                
                
                             interaction.followUp({
                                content: 'Choose your starter!',
                                components: [row, row2,],
                            });
                
                
                
                
                        }
                        
                    })
                    .catch(collected => {
                        interaction.followUp('Il semble que personne n\'ait entré le bon code de confirmation.');
                    });
            })
            .catch(error => {
                console.error(error);
                interaction.followUp('Une erreur est survenue lors de l\'envoi du message.');
            });
            
            

    },
 
    
}