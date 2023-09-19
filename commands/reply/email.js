const { ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('email')
        .setDescription('va permettre de confirmer ton email;)'),

    async execute(interaction) {
        const modal = new ModalBuilder()
            .setCustomId(`myModal-${interaction.user.id}`)
            .setTitle('Vérification Email Ynov')

        const emailUser = new TextInputBuilder()
            .setCustomId('emailLabel')
            // The label is the prompt the user sees for this input
            .setLabel("Quel est ton email Ynov?")
			.setPlaceholder('prenom.nom@ynoc.com')
            // Short means only a single line of text
            .setStyle(TextInputStyle.Short);

     

        // An action row only holds one text input,
        // so you need one action row per text input.
        const firstActionRow = new ActionRowBuilder().addComponents(emailUser);


        // Add inputs to the modal
        modal.addComponents(firstActionRow);

        // Show the modal to the user
        await interaction.showModal(modal);
		const filter = (modalInteraction) => modalInteraction.customId === `myModal-${interaction.user.id}`;
		const modalInteraction = await interaction.awaitModalSubmit({ filter, time: 30000 });
  
		const emailUserValue = modalInteraction.fields.getTextInputValue('emailLabel');
		await interaction.followUp(`Ton adresse email est ${emailUserValue}`);
	  }, catch (error) {
		console.error(error);
	  }
    }
