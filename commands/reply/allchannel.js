const { SlashCommandBuilder, ChannelType, PermissionsBitField, CategoryChannel, GUILD_CATEGORY } = require('discord.js');
const classe = ["B1", "B2", "B3", "M1", "M2"];
const filiere = ["CREA \ud83d\udc69\u200d",        // Emoji : CREA 🎨
    "AUDIOVISUEL \ud83c\udfa5",      // Emoji : AUDIOVISUEL 🎥
    "MARCOM \ud83e\udd33",           // Emoji : MARCOM 🤳
    "3D ANIM \ud83d\udc7e",           // Emoji : 3D ANIM 👾
    "Info \ud83d\udcbb",             // Emoji : Info 💻
    "ARCHI \ud83d\udccf"             // Emoji : ARCHI 📏];
];
const { Client, Collection, GatewayIntentBits, Events } = require('discord.js');  // Importation des composants nécessaires de la bibliothèque 'discord.js'



const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMessageReactions, GatewayIntentBits.MessageContent] });  // Création d'un nouveau client Discord avec les intentions spécifiées

client.commands = new Collection();  // Création d'une collection pour stocker les commandes


module.exports = {
    data: new SlashCommandBuilder()
        .setName('allchannel')
        .setDescription('Crée un canal de redirection sur le serveur'),

    async execute(interaction) {
        for (let i = 0; i < classe.length; i++) {
            for (let j = 0; j < filiere.length; j++) {
                const category = await interaction.guild.channels.create({
                    type: ChannelType.GuildCategory,
                    name: `${classe[i]} - ${filiere[j]}`,
                    permissionOverwrites: [

                        {
                            id: '1155453304659259472',
                            allow: [PermissionsBitField.Flags.ViewChannel],
                        }
                        // Ajoutez les autorisations spécifiques ici
                    ]

                });
                console.log(`Created category ${category.id}`);




                await interaction.guild.channels.create({
                    name: "Général",
                    type: ChannelType.GuildText,
                    parent: category.id,
                    permissionOverwrites: [
                        {
                            id: '1155453304659259472',
                            allow: [PermissionsBitField.Flags.ViewChannel],
                        }
                    ]
                });

                await interaction.guild.channels.create({
                    name: "Documentation",
                    type: ChannelType.GuildText,
                    parent: category.id,
                    permissionOverwrites: [
                        {
                            id: '1155453304659259472',
                            allow: [PermissionsBitField.Flags.ViewChannel],
                        }
                    ]
                });
                await interaction.guild.channels.create({
                    name: "Ressources",
                    type: ChannelType.GuildText,
                    parent: category.id,
                    permissionOverwrites: [
                        {
                            id: '1155453304659259472',
                            allow: [PermissionsBitField.Flags.ViewChannel],
                        }
                    ]
                });
            }
        }
    }
}



// await interaction.guild.channels.create({
//     name: "Général",
//     parent: "1155284409969287198",
//     permissionOverwrites: [
//         {
//             id: '1155273163236708424',
//             allow: [PermissionsBitField.Flags.ViewChannel],
//         },
//         {
//             id: interaction.user.id,
//             allow: [
//                 PermissionsBitField.Flags.ViewChannel,
//                 PermissionsBitField.Flags.SendMessages,
//                 PermissionsBitField.Flags.ReadMessageHistory
//             ],
//         },
//         {
//             id: '1155274095609512009',
//             allow: [
//                 PermissionsBitField.Flags.ViewChannel,
//                 PermissionsBitField.Flags.SendMessages,
//                 PermissionsBitField.Flags.ReadMessageHistory
//             ],
//         },
//     ],
// });



