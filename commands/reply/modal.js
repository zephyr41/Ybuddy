const { ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('modal')
    .setDescription('Permet d\'envoyer vers le channel de la filière'),

  run: async ({ interaction }) => {
    try {
      const modal = new ModalBuilder({
        customId: `myModal-${interaction.user.id}`,
        title: 'Verification Email',
      });

      const emailUser = new TextInputBuilder({
        customId: 'emailLabel',
        label: 'Quel est ton adresse email Ynov ?',
        placeholder: 'prenom.nom@ynov.com',
        style: TextInputStyle.Short,
      });

      const firstActionRow = new ActionRowBuilder().addComponents(emailUser);
      modal.addComponents(firstActionRow);

      await interaction.showModal(modal);

      const filter = (modalInteraction) => modalInteraction.customId === `myModal-${interaction.user.id}`;
      const modalInteraction = await interaction.awaitModalSubmit({ filter, time: 30000 });

      const emailValue = modalInteraction.values.emailLabel;
      await interaction.reply(`Ton adresse email est ${emailValue}`);
    } catch (error) {
      console.error(error);
      await interaction.reply('Tu n\'as pas répondu à temps !');
    }
  },
};
