// const { ActionRowBuilder, Events, ModalBuilder, TextInputBuilder, TextInputStyle, Client, GatewayIntentBits, SlashCommandBuilder } = require('discord.js');

// const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.MessageContent] });






// module.exports = {
//     data: new SlashCommandBuilder()
//         .setName('email')
//         .setDescription("Description de la commande email"),

//     async execute(interaction) {
//         const data = new SlashCommandBuilder()
//         .setName('email')
//         .setDescription("va permettre de t'envoyer vers le channel de ta filière");

//     if (interaction.commandName === 'email') {
//         // Create the modal
//         const modal = new ModalBuilder()
//             .setCustomId('myModal')
//             .setTitle('My Modal');

//         // Add components to modal

//         // Create the text input components
//         const favoriteColorInput = new TextInputBuilder()
//             .setCustomId('favoriteColorInput')
//             .setLabel("What's your favorite color?")
//             .setStyle(TextInputStyle.Short);

//         const hobbiesInput = new TextInputBuilder()
//             .setCustomId('hobbiesInput')
//             .setLabel("What's some of your favorite hobbies?")
//             .setStyle(TextInputStyle.Paragraph);

//         // An action row only holds one text input,
//         // so you need one action row per text input.
//         const firstActionRow = new ActionRowBuilder().addComponents(favoriteColorInput);
//         const secondActionRow = new ActionRowBuilder().addComponents(hobbiesInput);

//         // Add inputs to the modal
//         modal.addComponents(firstActionRow, secondActionRow);

//         // Show the modal to the user
//         await interaction.showModal(modal);

//         // Attend la soumission du formulaire (modal)
//         const submittedModal = await interaction.awaitModalSubmit();

//         // Récupère les valeurs des champs
//         const favoriteColorValue = submittedModal.fields.getTextInputValue('favoriteColorInput');
//         const hobbiesValue = submittedModal.fields.getTextInputValue('hobbiesInput');

//         // Utilise les valeurs récupérées
//         console.log('Favorite Color:', favoriteColorValue);
//         console.log('Hobbies:', hobbiesValue);

//         // Répond à l'interaction avec les valeurs récupérées
//         await interaction.reply(`Tu as choisi ${favoriteColorValue} comme couleur préférée et tes hobbies sont : ${hobbiesValue}`);
//     }
//     }
// };
