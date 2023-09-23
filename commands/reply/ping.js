const { ButtonBuilder, ButtonStyle, SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Ban un utilisateur'),
	async execute(interaction) {



		const confirm = new ButtonBuilder()
			.setCustomId('confirm')
			.setLabel('Confirm Ban')
			.setStyle(ButtonStyle.Danger);

            const row = new ActionRowBuilder()
			.addComponents(confirm);

	},
};