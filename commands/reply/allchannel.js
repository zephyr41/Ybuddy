const { SlashCommandBuilder, ChannelType, PermissionsBitField } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('allchannel')
        .setDescription('Crée un canal de redirection sur le serveur'),

    async execute(interaction) {
        for (var i = 0; i < 3; i++){
       await interaction.guild.channels.create({
            name: `${i} redirection discord`,
                parent: '1155441689700339762',
                permissionOverwrites: [
                    {
                        id: '1155273163236708424',
                        allow: [PermissionsBitField.Flags.ViewChannel],
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
                        id: '1155274095609512009',
                        allow: [
                            PermissionsBitField.Flags.ViewChannel,
                            PermissionsBitField.Flags.SendMessages,
                            PermissionsBitField.Flags.ReadMessageHistory
                        ],
                    },
                ],
            });
        }
    }
}
