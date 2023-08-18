const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('createchannel')
		.setDescription('Crée un nouveau salon'),
	async execute(interaction) {
		const member = interaction.member;

		if (!member) {
			return interaction.reply('Cette commande n\'est utilisable que par des membres.');
		}

		// Création du bouton pour créer un canal privé
		const button = new MessageButton()
			.setCustomId('create_private_channel')
			.setLabel('Pour commencer, appuie ici pour créer un channel privé')
			.setStyle('PRIMARY');

		// Création de la rangée de boutons
		const row = new MessageActionRow().addComponents(button);

		// Répondre avec un message qui contient le bouton
		await interaction.reply({ content: 'Cliquez sur le bouton pour créer un canal privé', components: [row] });
	},
};

