const { ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, SlashCommandBuilder } = require('discord.js');
const generateCode = require('../../generateCode.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('email')
        .setDescription('Permet de confirmer votre email'),

    async execute(interaction) {
        const modal = new ModalBuilder()
            .setCustomId('email')
            .setTitle('Vérification Email Ynov');

        const emailUser = new TextInputBuilder()
            .setCustomId('emailUser')
            .setLabel('Quel est votre email Ynov?')
            .setPlaceholder('prenom.nom@ynoc.com')
            .setStyle(TextInputStyle.Short);

        const actionRow = new ActionRowBuilder()
            .addComponents(emailUser);

        modal.addComponents(actionRow);

        await interaction.showModal(modal);
    }
}
async function handleModal(interaction) {
    const emailer = interaction.fields.getTextInputValue('emailUser');
    console.log(emailer);
    await interaction.reply({ content: `Votre email est ${emailer}`, ephemeral: true });
}


module.exports.handleModal = handleModal;
