const { ActionRowBuilder, ButtonBuilder, ButtonStyle, SlashCommandBuilder, ChannelType, PermissionsBitField, Events, ModalBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('modal')
        .setDescription('va permettre de t\'envoyer vers le channel de ta filière buddy ;)'),

    async execute(interaction) {
        const modal = new ModalBuilder()
            .setCustomId('modal')
            .setTitle('Vérification Email')

        const favoriteColorInput = new TextInputBuilder()
            .setCustomId('emailUser')
            // The label is the prompt the user sees for this input
            .setLabel("Quel est votre adresse Email Ynov ?")
            .setPlaceholder('prénom.nom@ynov.com')
            .setStyle(TextInputStyle.Short);

        const firstActionRow = new ActionRowBuilder().addComponents(favoriteColorInput);

        // Add inputs to the modal
        modal.addComponents(firstActionRow);

        // Show the modal to the user
        await interaction.showModal(modal);
    }
}