
const { ActionRowBuilder, ButtonBuilder, ButtonStyle, SlashCommandBuilder, ChannelType, PermissionsBitField, Events, ModalBuilder, TextInputBuilder, TextInputStyle, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, ComponentType } = require('discord.js');

module.exports = {
    name: Events.InteractionCreate,
    data: new SlashCommandBuilder()
        // donne un nom à la commande
        .setName('joinclass')
        .setDescription('Va permettre de t\'envoyer vers le channel de ta filière buddy ;)'),

    

}

