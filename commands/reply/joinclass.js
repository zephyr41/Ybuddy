const { ActionRowBuilder, ButtonBuilder, ButtonStyle, SlashCommandBuilder, ChannelType, PermissionsBitField, Events, ModalBuilder, TextInputBuilder, TextInputStyle, StringSelectMenuBuilder, StringSelectMenuOptionBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('joinclass')
        .setDescription('va permettre de t\'envoyer vers le channel de ta filière buddy ;)'),
    async execute(interaction) {
        const select = new StringSelectMenuBuilder()
            .setCustomId('starter')
            .setPlaceholder('Quel est ta filière ?')
            .addOptions(
                new StringSelectMenuOptionBuilder()
                    .setLabel('Création & Design')
                    .setDescription('Si tu prend le chemin créatif')
                    .setValue('creationDesign'),

                new StringSelectMenuOptionBuilder()
                    .setLabel('Audiovisuel')
                    .setDescription('Si t\'es en route pour devenir le futur Christopher Nolan')
                    .setValue('audiovisuel'),

                new StringSelectMenuOptionBuilder()
                    .setLabel('Marketing & Communication')
                    .setDescription('Si tu veux devenir le prochain Steve Jobs')
                    .setValue('marketingCommunication'),

                new StringSelectMenuOptionBuilder()
                    .setLabel('3d & VFX')
                    .setDescription('Si tu veux crée le prochain AAA')
                    .setValue('3dVFX'),

                new StringSelectMenuOptionBuilder()
                    .setLabel('Informatique')
                    .setDescription('Si tu veux devenir un crack en code ')
                    .setValue('informatique'),

                new StringSelectMenuOptionBuilder()
                    .setLabel('Architecture')
                    .setDescription('Si tu veux devenir le prochain Frank Lloyd Wright')
                    .setValue('architecture'),
            );


        const select_class = new StringSelectMenuBuilder()
            .setCustomId('Classynov')
            .setPlaceholder('en quel année est tu ?')
            .addOptions(
                new StringSelectMenuOptionBuilder()
                    .setLabel('B1')
                    .setValue('b1'),

                new StringSelectMenuOptionBuilder()
                    .setLabel('B2')
                    .setValue('b2'),

                new StringSelectMenuOptionBuilder()
                    .setLabel('B3')
                    .setValue('3emeAnnee'),

                new StringSelectMenuOptionBuilder()
                    .setLabel('M1')
                    .setValue('m1'),

                new StringSelectMenuOptionBuilder()
                    .setLabel('M2')
                    .setValue('m2'),

            )

        const row = new ActionRowBuilder()
            .addComponents(select);


        const row2 = new ActionRowBuilder()
            .addComponents(select_class);


        const buttonEmailConfirm = new ButtonBuilder()
            .setCustomId('confirm')
            .setLabel('Cliquez ici pour entrer votre adresse email')
            .setStyle(ButtonStyle.Primary);

        const row3 = new ActionRowBuilder()
            .addComponents(buttonEmailConfirm);

        await interaction.reply({
            content: 'Rentre tes infos :) !',
            components: [row, row2, row3],
        });
    },
};





