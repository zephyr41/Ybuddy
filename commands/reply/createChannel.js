const { ActionRowBuilder, ButtonBuilder, ButtonStyle, SlashCommandBuilder, ChannelType, PermissionsBitField } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
	// nom de la commande discord
        .setName('createchannel')
        .setDescription('va permettre de t\'envoyer vers le channel de ta filière'),

		// fonction qui va être exécutée quand la commande sera appelée
    async execute(interaction) {

		// ajout de button
        const confirm = new ButtonBuilder()
            .setCustomId('confirm')
            .setLabel('Confirm')
            .setStyle(ButtonStyle.Success);

        const cancel = new ButtonBuilder()
            .setCustomId('cancel')
            .setLabel('Cancel')
            .setStyle(ButtonStyle.Secondary);

			// permet un message interactif : ici avec les buttons (liste déroulantes…)
        const row = new ActionRowBuilder()
            .addComponents(confirm, cancel);
		// attends la réponse de l'interaction puis répond
        await interaction.reply({
            content: `Je vais créer un channel ${interaction.user.username}, pour pouvoir te rediriger vers le bon chnnel.`,
            components: [row],
        });
		// permet de venir récupéré l'id de l'utilisateur
        const filter = i => i.user.id === interaction.user.id;
        const collector = interaction.channel.createMessageComponentCollector({ filter, time: 30000 });
		// permet de venir récolter plusieurs informations de manière asynchrone (ici nous attendons plusieurs chose que nous voulons collecter, la liste des buttosn)
        collector.on('collect', async i => {
            if (i.customId === 'confirm') {
				// permet de crée le nom du channel, et l'associe à une variable
                const createdChannel = await interaction.guild.channels.create({
                    name: `${interaction.user.username} redirection discord`,
                    parent: '1142450128670703646',
                    type: ChannelType.GuildText,
                    permissionOverwrites: [
                        {
                            id: '1004015076002504715', // ID du rôle "everyone" permet de masquer le channel sur tout le monde 
                            deny: [PermissionsBitField.Flags.ViewChannel],
                        },
                        {
                            id: interaction.user.id, // donne accès a  l'utilisateur des droits pour le channel
                            allow: [
                                PermissionsBitField.Flags.ViewChannel,
                                PermissionsBitField.Flags.SendMessages,
                                PermissionsBitField.Flags.ReadMessageHistory
                            ],
                        },
                        {
                            id: '1136102459023044648', // donne accès a Ybyddg à son channel des droits
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
                await createdChannel.send("** - Ne communique ici jamais de mot de passe ou d'informations personnelles !  - **");
				await createdChannel.send("je vais te demander un code par email pour vérifier que tu est bien un étudiant d'Ynov ! ");

                 
                
                // Envoyer un message avec le bouton "Continuer" dans le salon nouvellement créé
                await createdChannel.send( 'Maintenant, Envoie un message en écrivant /Email !');
				
				
                await interaction.editReply({ content: 'Channel créé, va en dessous de Welcome :)!', ephemeral: true });
				
            } else if (i.customId === 'cancel') {
                await interaction.followUp({ content: 'Annulé !', ephemeral: true });
                console.log("Erreur ici ? echec de l'interaction ici ")
            }
        });
    },
};
