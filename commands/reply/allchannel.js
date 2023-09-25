const { SlashCommandBuilder, ChannelType, PermissionsBitField, Client, Collection, GatewayIntentBits } = require('discord.js');

const classe = ["B1", "B2", "B3", "M1", "M2"];
const filiere = ["CREA 🎨", "AUDIOVISUEL 🎥", "MARCOM 🤳", "3D ANIM 👾", "INFO 💻", "ARCHI 📏"];
const filiereForCheckRole = ["CREA", "AUDIOVISUEL", "MARCOM", "3D ANIM", "INFO", "ARCHI"];

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMessageReactions, GatewayIntentBits.MessageContent] });
client.commands = new Collection();

module.exports = {
    data: new SlashCommandBuilder()
        .setName('allchannel')
        .setDescription('Crée un canal de redirection sur le serveur'),

    async execute(interaction) {
        const guild = interaction.guild;

        for (let i = 0; i < classe.length; i++) {
            for (let j = 0; j < filiere.length; j++) {
                let roleCreated = `${filiereForCheckRole[j]} - ${classe[i]}`;
                let roleId = "";

                const roleFind = guild.roles.cache.find(role => role.name === roleCreated);
                if (roleFind) {
                    roleId = roleFind.id;
                    console.log(roleId);
                } 

                const category = await interaction.guild.channels.create({
                    type: ChannelType.GuildCategory,
                    name: `${classe[i]} - ${filiere[j]}`,
                    permissionOverwrites: [
                        {
                            id: '1155453304659259472',
                            deny: [PermissionsBitField.Flags.ViewChannel],
                        },
                        {
                            id: roleId,
                            allow: [PermissionsBitField.Flags.ViewChannel],
                        }
                    ]
                });

                console.log(`Created category ${category.id}`);
            }
        }
    }
};
