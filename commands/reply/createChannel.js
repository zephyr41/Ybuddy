const { ActionRowBuilder, ButtonBuilder, ButtonStyle, SlashCommandBuilder } = require('discord.js');

module.exports = {

	data: new SlashCommandBuilder()
		.setName('createchannel')
		.setDescription('va permettre de t\'envoyer vers le channel de ta filière'),
	async execute(interaction) {

		const confirm = new ButtonBuilder()
			.setCustomId('confirm')
			.setLabel('Confirm')
			.setStyle(ButtonStyle.Success);

		const row = new ActionRowBuilder()
			.addComponents(confirm);

		await interaction.reply({
			content: `Je vais crée un channel ${interaction.user.username}, pour pouvoir te rediriger vers le bon chnnel.`,
			components: [row],
		});
	},
};