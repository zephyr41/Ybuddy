const { ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, SlashCommandBuilder,Client,GatewayIntentBits,Events } = require('discord.js');


module.exports = {
    data: new SlashCommandBuilder()

        .setName('verifemail')
        .setDescription('va permettre de vérifier ton email'),

    async execute(interaction) {
        
        const modal = new ModalBuilder()
            .setCustomId('VerifEmail')
            .setTitle('Vérification Email Ynov')

        const emailUser = new TextInputBuilder()
            .setCustomId('codeVerif')
            // The label is the prompt the user sees for this input
            .setLabel("Quel est ton code de vérification Ynov?")
            .setPlaceholder('ex : 123456')
            // Short means only a single line of text
            .setStyle(TextInputStyle.Short);



        // An action row only holds one text input,
        // so you need one action row per text input.
        const firstActionRow = new ActionRowBuilder().addComponents(emailUser);


        // Add inputs to the modal
        modal.addComponents(firstActionRow);

        // Show the modal to the user
        await interaction.showModal(modal);
        
    }
}