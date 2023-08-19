const { ActionRowBuilder, ButtonBuilder, ButtonStyle, SlashCommandBuilder, Guild } = require('discord.js');

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

		const filter = i => i.user.id === interaction.user.id;
		const collector = interaction.channel.createMessageComponentCollector({ filter, time: 15000 });

		collector.on('collect', async i => {
			if (i.customId === 'confirm') {
				await interaction.followUp({ content: 'Confirmed!', ephemeral: true });
				guild.channels.create({
					name: 'new-channel',
					parent: '1142450128670703646',
					type: ChannelType.GuildText,
					permissionOverwrites: [
						{
							id: interaction.guild.id,
							deny: [PermissionsBitField.Flags.ViewChannel],
						},
						{
							id: interaction.user.id,
							allow: [PermissionsBitField.Flags.ViewChannel],
						},
					],
				});
				await interaction.followUp({ content: 'Channel created!', ephemeral: true });
			}
			
			else if (i.customId === 'cancel') {
				await interaction.followUp({ content: 'Canceled!', ephemeral: true });
			}
		},
		);

	},

};
