const { ActionRowBuilder, ButtonBuilder, ButtonStyle, SlashCommandBuilder, ChannelType, PermissionsBitField } = require('discord.js');

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
            content: `Je vais créer un channel ${interaction.user.username}, pour pouvoir te rediriger vers le bon chnnel.`,
            components: [row],
        });

        const filter = i => i.user.id === interaction.user.id;
        const collector = interaction.channel.createMessageComponentCollector({ filter, time: 30000 });

        collector.on('collect', async i => {
            if (i.customId === 'confirm') {
                const createdChannel = await interaction.guild.channels.create({
                    name: `${interaction.user.username} redirection discord`,
                    parent: '1142450128670703646',
                    type: ChannelType.GuildText,
                    permissionOverwrites: [
                        {
                            id: '1004015076002504715', // ID du rôle "everyone"
                            deny: [PermissionsBitField.Flags.ViewChannel],
                        },
                        {
                            id: interaction.user.id,
                            allow: [
                                PermissionsBitField.Flags.ViewChannel,
                                PermissionsBitField.Flags.SendMessages,
                                PermissionsBitField.Flags.ReadMessageHistory
                            ],
                        },
                        {
                            id: '1136102459023044648', // ID de votre bot
                            allow: [
                                PermissionsBitField.Flags.ViewChannel,
                                PermissionsBitField.Flags.SendMessages,
                                PermissionsBitField.Flags.ReadMessageHistory
                            ],
                        },
                    ],
                });

                // Envoyer un message dans le salon nouvellement créé
                await createdChannel.send("Hello, ceci est un channel privé mais visible par les administrateurs!");
                await createdChannel.send("Ne communique ici jamais de mot de passe ou d'informations personnelles!");

                const continuerButton = new ButtonBuilder()
                    .setCustomId('continue')
                    .setLabel('Continuer')
                    .setStyle(ButtonStyle.Success);
                const Continuer = new ActionRowBuilder()
                    .addComponents(continuerButton);
                
                // Envoyer un message avec le bouton "Continuer" dans le salon nouvellement créé
                await createdChannel.send({ content: `Maintenant, je vais te rediriger vers ton channel`, components: [Continuer] });

                await interaction.followUp({ content: 'Channel créé, il est en dessous de Welcome :)!', ephemeral: true });
            } else if (i.customId === 'cancel') {
                await interaction.editReply({ content: 'Annulé !', ephemeral: true });
            }
        });
    },
};
