const { ActionRowBuilder, ButtonBuilder, ButtonStyle, SlashCommandBuilder, response } = require('discord.js');

module.exports = {

	data: new SlashCommandBuilder()
		.setName('createchannel')
		.setDescription('va permettre de t\'envoyer vers le channel de ta filière'),
	async execute(interaction) {
		const confirm = new ButtonBuilder()
			.setCustomId('confirm')
			.setLabel('Confirm')
			.setStyle(ButtonStyle.Success);

		const cancel = new ButtonBuilder()
			.setCustomId('cancel')
			.setLabel('Cancel')
			.setStyle(ButtonStyle.Secondary);

		const row = new ActionRowBuilder()
			.addComponents(confirm, cancel);

		await interaction.reply({
			content: `Je vais crée un channel ${interaction.user.username}, pour pouvoir te rediriger vers le bon chnnel.`,
			components: [row],
		});
		const collectorFilter = i => i.user.username === interaction.user.id && i.customId === 'confirm';

		try {
			const confirmation = await response.awaitMessageComponent({ filter: collectorFilter });

			if (confirmation.customId === 'confirm') {
				await confirmation.update({ content: 'Action confirmed', components: [] });
				console.log('Action confirmed');
			}
			else if (confirmation.customId === 'cancel') {
				console.log('Action cancelled');
			}
		}
		catch (e) {
			await interaction.editReply({ content: 'Confirmation not received within 1 minute, cancelling', components: [] });
		}

	},

};
// guild.channels.create({
// 	name: 'new-channel',
// 	type: ChannelType.GuildText,
// 	permissionOverwrites: [
// 		{
// 			id: interaction.guild.id,
// 			deny: [PermissionsBitField.Flags.ViewChannel],
// 		},
// 		{
// 			id: interaction.user.id,
// 			allow: [PermissionsBitField.Flags.ViewChannel],
// 		},
// 	],
// });