const { ActionRowBuilder, ButtonBuilder, GatewayIntentBits, SlashCommandBuilder, Client, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, ComponentType } = require('discord.js');
const generateCode = require('../../GenerateCode.js');
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
        await interaction.deferReply(); // Vous pouvez garder cette ligne si vous souhaitez différer la réponse initiale

        const guild = interaction.guild;

        const prenom = interaction.options.getString('prenom');
        const nom = interaction.options.getString('nom');

        const code = generateCode();  // Generate a new confirmation code
        console.log(`Code de confirmation pour ${prenom} ${nom} : ${code}`);
        const email = `${prenom}.${nom}@ynov.com`;
        console.log(`Email de confirmation pour ${prenom} ${nom} : ${email}`);
        // sendEmail(email, code);  // en com pour éviter la polution :D a la place généré dans la console pour phase de test
        const collectorFilter = response => {
            return response.content === code.toLowerCase();  // Compare the user's response to the confirmation code
        };

        interaction.editReply({ content: "Veuillez entrer le code de vérification envoyé par email :", fetchReply: true })
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
                                        .setValue('CREA'),

                                    new StringSelectMenuOptionBuilder()
                                        .setLabel('Audiovisuel')
                                        .setDescription('Si t\'es en route pour devenir le futur Christopher Nolan')
                                        .setValue('AUDIOVISUEL'),

                                    new StringSelectMenuOptionBuilder()
                                        .setLabel('Marketing & Communication')
                                        .setDescription('Si tu veux devenir le prochain Steve Jobs')
                                        .setValue('MARCOM'),

                                    new StringSelectMenuOptionBuilder()
                                        .setLabel('3d animation')
                                        .setDescription('Si tu veux crée le prochain AAA')
                                        .setValue('3D ANIM'),

                                    new StringSelectMenuOptionBuilder()
                                        .setLabel('Informatique')
                                        .setDescription('Si tu veux devenir un crack en code ')
                                        .setValue('INFO'),

                                    new StringSelectMenuOptionBuilder()
                                        .setLabel('Architecture')
                                        .setDescription('Si tu veux devenir le prochain Frank Lloyd Wright')
                                        .setValue('ARCHI'),
                                );
                            // liste des menus 2 pour choisir la filière 
                            const select_class = new StringSelectMenuBuilder()
                                .setCustomId('Classynov')
                                .setPlaceholder('En quelle année es-tu ?')
                                .addOptions(
                                    new StringSelectMenuOptionBuilder()
                                        .setLabel('B1')
                                        .setValue('B1'),

                                    new StringSelectMenuOptionBuilder()
                                        .setLabel('B2')
                                        .setValue('B2'),

                                    new StringSelectMenuOptionBuilder()
                                        .setLabel('B3')
                                        .setValue('B3'),

                                    new StringSelectMenuOptionBuilder()
                                        .setLabel('M1')
                                        .setValue('M1'),

                                    new StringSelectMenuOptionBuilder()
                                        .setLabel('M2')
                                        .setValue('M2'),
                                );

                            // met les composants dans une variable
                            const row = new ActionRowBuilder()
                                .addComponents(select);

                            const row2 = new ActionRowBuilder()
                                .addComponents(select_class);
                            interaction.followUp({
                                content: 'Choose your starter!',
                                components: [row, row2,],
                            });


                            const selectedValues = []; // create an empty array to store the selected values

                            const collector2 = interaction.channel.createMessageComponentCollector({ componentType: ComponentType.StringSelect, time: 10_000 });
                            collector2.on('collect', async i => {
                                i.deferUpdate();
                                if (i.values[0]) { // check if the first value exists before adding it to the array
                                    selectedValues.push(i.values[0]); // add the first selected value to the array
                                }
                                console.log(selectedValues);
                                if (i.values[1]) { // check if the second value exists before adding it to the array
                                    selectedValues.push(i.values[1]); // add the second selected value to the array
                                }
                                console.log(selectedValues);
                            });


                            collector2.on('end', async collected => {
                                if (collected.size === 0) {
                                    await interaction.followUp('Aucune sélection n\'a été effectuée.');
                                } else {
                                    roleName = `${selectedValues[0]} - ${selectedValues[1]}`;
                                    await interaction.followUp(`Vous avez sélectionné ${roleName}.`);
                                    const roleFind = guild.roles.cache.find(role => role.name === roleName)?.id;
                                    console.log(`Role trouvé : ${roleFind}`);
                                    if (roleFind) {
                                        interaction.member.roles.add(roleFind);
                                        await interaction.followUp({ content: `${interaction.user} est ajouté au rôle ${roleName}!`, components: [] });
                                    } else {
                                        await interaction.followUp({ content: `Le rôle ${roleName} n'existe pas.`, components: [] });
                                    }
                                }
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