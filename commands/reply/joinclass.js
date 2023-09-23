
const { ActionRowBuilder, ButtonBuilder, ButtonStyle, SlashCommandBuilder, ChannelType, PermissionsBitField, Events, ModalBuilder, TextInputBuilder, TextInputStyle, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, ComponentType } = require('discord.js');

module.exports = {
    name: Events.InteractionCreate,
    data: new SlashCommandBuilder()
        // donne un nom à la commande
        .setName('joinclass')
        .setDescription('Va permettre de t\'envoyer vers le channel de ta filière buddy ;)'),

    async execute(interaction) {
        if (interaction.isChatInputCommand()) {

            const select = new StringSelectMenuBuilder()
                .setCustomId('starter')
                .setPlaceholder('Quelle est ta filière ?')
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
            // liste des menus 2 pour choisir la filière 
            const select_class = new StringSelectMenuBuilder()
                .setCustomId('Classynov')
                .setPlaceholder('En quelle année es-tu ?')
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
                );

            // met les composants dans une variable
            const row = new ActionRowBuilder()
                .addComponents(select);

            const row2 = new ActionRowBuilder()
                .addComponents(select_class);

            const buttonEmailConfirm = new ButtonBuilder()
                .setCustomId('confirmEmail')
                .setLabel('Cliquez ici pour entrer votre adresse email')
                .setStyle(ButtonStyle.Primary);

            const row3 = new ActionRowBuilder()
                .addComponents(buttonEmailConfirm);
            // permet de dire que l'interaction comprend 3 choses




            await interaction.reply({
                content: 'Choose your starter!',
                components: [row, row2, row3],
            });




        }

    }

}

