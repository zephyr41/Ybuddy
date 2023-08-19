const {
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    SlashCommandBuilder,
} = require('discord.js');

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

                const filter = i => i.customId === 'confirm' || i.customId === 'cancel';
                const collector = interaction.channel.createMessageComponentCollector({
                    filter,
                    time: 15000
                });

                collector.on('collect', async i => {
                            if (i.customId === 'confirm') {
                                await i.update({
                                    content: 'Confirmed!',
                                    components: []
                                });
                                Guild.channels.create({
                                        name: (' CONNEXION DISCORD POUR ${interaction.user.username}'),
                                        type: ChannelType.GuildText,
                                        permissionOverwrites: [{
                                            id: interaction.guild.id,
                                            deny: [PermissionsBitField.Flags.ViewChannel],
                                        }, ],
                                    }

                                    else if (i.customId === 'cancel') {
                                        await i.update({
                                            content: 'Cancelled!',
                                            components: []
                                        });
                                    }
                                },
                            );

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