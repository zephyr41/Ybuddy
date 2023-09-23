const { ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, SlashCommandBuilder } = require('discord.js');
const nodemailer = require('nodemailer');
const generateCode = require('../../generateCode.js');
const sendEmail = require('../../sendmail.js');
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
    const emailRegex = /@ynov\.com$/;  // Expression régulière pour vérifier la terminaison du domaine

    if (emailRegex.test(emailer)) {
        // L'email se termine par '@ynov.com'
        const code = generateCode();
        sendEmail(emailer, code);

        await interaction.reply({ content: `J'ai envoyé un email à ${emailer}`, ephemeral: true });
    } else {
        // L'email ne se termine pas par '@ynov.com'
        await interaction.reply({ content: 'Veuillez saisir une adresse email se terminant par @ynov.com. taper la commande /email pour ressayer', ephemeral: true });
    }
}


module.exports.handleModal = handleModal;
