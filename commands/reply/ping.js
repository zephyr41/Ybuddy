const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('insult')
		.setDescription('Replies with an insult!'),
	async execute(interaction) {
		await interaction.reply('espece de fond de benne!');
	},
};
