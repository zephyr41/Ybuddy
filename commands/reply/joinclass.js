const { ActionRowBuilder, ButtonBuilder, ButtonStyle, SlashCommandBuilder, ChannelType, PermissionsBitField, Events, ModalBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');

// module.exports = {
//     data: new SlashCommandBuilder()
//         .setName('joinclass')
//         .setDescription('va permettre de t\'envoyer vers le channel de ta filière buddy ;)'),

//     async execute(interaction) {
//         const modal = new ModalBuilder()
//             .setCustomId('modal')
//             .setTitle('filiere')


//         // const select_filiere_ynov = new StringSelectMenuBuilder()
//         // .setCustomId('selectfiliere')
//         // .setPlaceholder('Choisis ta filière')
//         // .addOptions(
//         //     new StringSelectMenuOptionBuilder()
//         //     .setLabel('Création & Design')
//         //     .setDescription('Si tu prend le chemin créatif')
//         //     .setValue('creationDesign'),

//         //     new StringSelectMenuOptionBuilder()
//         //     .setLabel('Audiovisuel')
//         //     .setDescription('Si t\'es en route pour devenir le futur Christopher Nolan')
//         //     .setValue('audiovisuel'),

//         //     new StringSelectMenuOptionBuilder()
//         //     .setLabel('Marketing & Communication')
//         //     .setDescription('Si tu veux devenir le prochain Steve Jobs')
//         //     .setValue('marketingCommunication'),

//         //     new StringSelectMenuOptionBuilder()
//         //     .setLabel('3d & VFX')
//         //     .setDescription('Si tu veux crée le prochain AAA')
//         //     .setValue('3dVFX'),

//         //     new StringSelectMenuOptionBuilder()
//         //     .setLabel('Informatique')
//         //     .setDescription('Si tu veux devenir un crack en code ')
//         //     .setValue('informatique'),

//         //     new StringSelectMenuOptionBuilder()
//         //     .setLabel('Architecture')
//         //     .setDescription('Si tu veux devenir le prochain Frank Lloyd Wright')
//         //     .setValue('architecture'),


//         // )
//         // const select_class = new StringSelectMenuBuilder()
//         // .setCustomId('select_class_ynov')
//         // .setPlaceholder('Choisis ton année')
//         // .addOptions(
//         //     new StringSelectMenuOptionBuilder()
//         //     .setLabel('B1')
//         //     .setValue('b1'),

//         //     new StringSelectMenuOptionBuilder()
//         //     .setLabel('B2')
//         //     .setValue('b2'),

//         //     new StringSelectMenuOptionBuilder()
//         //     .setLabel('B3')
//         //     .setValue('3emeAnnee'),

//         //     new StringSelectMenuOptionBuilder()
//         //     .setLabel('M1')
//         //     .setValue('m1'),

//         //     new StringSelectMenuOptionBuilder()
//         //     .setLabel('M2')
//         //     .setValue('m2'),

//         // )

//         // const firstActionRow = new ActionRowBuilder().addComponents(select_filiere_ynov)
//         // const secondActionRow = new ActionRowBuilder().addComponents(select_class)

//         // modal.addComponents(firstActionRow, secondActionRow)

//         await interaction.showModal(modal);

//     }
// }

module.exports = {
    data: new SlashCommandBuilder()
        .setName('joinclass')
        .setDescription('va permettre de t\'envoyer vers le channel de ta filière buddy ;)'),

    async execute(interaction) {
        const modal = new ModalBuilder()
            .setCustomId('modal')
            .setTitle('filiere')

        const favoriteColorInput = new TextInputBuilder()
            .setCustomId('favoriteColorInput')
            // The label is the prompt the user sees for this input
            .setLabel("What's your favorite color?")
            // Short means only a single line of text
            .setStyle(TextInputStyle.Short);

        const hobbiesInput = new TextInputBuilder()
            .setCustomId('hobbiesInput')
            .setLabel("What's some of your favorite hobbies?")
            // Paragraph means multiple lines of text.
            .setStyle(TextInputStyle.Paragraph);

        // An action row only holds one text input,
        // so you need one action row per text input.
        const firstActionRow = new ActionRowBuilder().addComponents(favoriteColorInput);
        const secondActionRow = new ActionRowBuilder().addComponents(hobbiesInput);

        // Add inputs to the modal
        modal.addComponents(firstActionRow, secondActionRow);

        // Show the modal to the user
        await interaction.showModal(modal);
    }
}