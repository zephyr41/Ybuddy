const { SlashCommandBuilder, ChannelType, PermissionsBitField, Client, Collection, GatewayIntentBits } = require('discord.js');

const classe = ["B1", "B2", "B3", "M1", "M2"];
const filiere = ["CREA 🎨", "AUDIOVISUEL 🎥", "MARCOM 🤳", "3D ANIM 👾", "INFO 💻", "ARCHI 📏"];
const filiereForCheckRole = ["CREA", "AUDIOVISUEL", "MARCOM", "3D ANIM", "INFO", "ARCHI"];

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMessageReactions, GatewayIntentBits.MessageContent], });
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
                    console.log("role trouvé : ", roleId);
                } else {
                    console.log("role non trouvé après nous avons role created");
                    console.log("this djjdla", roleCreated);
                    roleId = "1155453304659259472";
                }
                console.log("role after creating catégories,", roleId);
                const category = await interaction.guild.channels.create({
                    type: ChannelType.GuildCategory,
                    name: `${classe[i]} - ${filiere[j]}`,
                    permissionOverwrites: [
                        {
                            id: roleId,
                            allow: [PermissionsBitField.Flags.ViewChannel]
                        },
                        {
                            id: '1155453304659259472',
                            deny: [PermissionsBitField.Flags.ViewChannel],
                        }
                    ]
                });

                console.log(`Created category ${category.id}`);
                await interaction.guild.channels.create({
                    name: "📣 ┊ Général",
                    type: ChannelType.GuildText,
                    parent: category.id,
                    permissionOverwrites: [
                        {
                            id: roleId,
                            allow: [
                                PermissionsBitField.Flags.ViewChannel,
                                PermissionsBitField.Flags.SendMessages,
                                PermissionsBitField.Flags.ReadMessageHistory,
                                PermissionsBitField.Flags.EmbedLinks,
                                PermissionsBitField.Flags.AttachFiles,
                                PermissionsBitField.Flags.AddReactions,
                                PermissionsBitField.Flags.UseExternalEmojis,
                                PermissionsBitField.Flags.UseApplicationCommands,
                                PermissionsBitField.Flags.ManageWebhooks,
                                // si jamais ajouté d'autre permission ici en ajouté :  ex de perm a ajouté, ne pas oublié de modifier la var Client en haut
                                // PermissionsBitField.Flags.ManageThreads,
                                //PermissionsBitField.Flags.UseSlashCommands,
                                // PermissionsBitField.Flags.CreatePublicThreads,
                                // PermissionsBitField.Flags.CreatePrivateThreads
                            ]
                        },
                        {
                            id: '1155453304659259472',
                            deny: [PermissionsBitField.Flags.ViewChannel],
                        }
                    ]
                });

                await interaction.guild.channels.create({
                    name: " 🖇️ ┊ Référence",
                    type: ChannelType.GuildText,
                    parent: category.id,
                    permissionOverwrites: [
                        {
                            id: roleId,
                            allow: [
                                PermissionsBitField.Flags.ViewChannel,
                                PermissionsBitField.Flags.SendMessages,
                                PermissionsBitField.Flags.ReadMessageHistory,
                                PermissionsBitField.Flags.EmbedLinks,
                                PermissionsBitField.Flags.AttachFiles,
                                PermissionsBitField.Flags.AddReactions,
                                PermissionsBitField.Flags.UseExternalEmojis,
                                PermissionsBitField.Flags.UseApplicationCommands,
                                PermissionsBitField.Flags.ManageWebhooks,
                                // si jamais ajouté d'autre permission ici en ajouté :  ex de perm a ajouté, ne pas oublié de modifier la var Client en haut
                                // PermissionsBitField.Flags.ManageThreads,
                                //PermissionsBitField.Flags.UseSlashCommands,
                                // PermissionsBitField.Flags.CreatePublicThreads,
                                // PermissionsBitField.Flags.CreatePrivateThreads
                            ]
                        },
                        {
                            id: '1155453304659259472',
                            deny: [PermissionsBitField.Flags.ViewChannel],
                        }
                    ]
                });
                await interaction.guild.channels.create({
                    name: " 🚀 ┊ Projet",
                    type: ChannelType.GuildText,
                    parent: category.id,
                   
                    permissionOverwrites: [
                        {
                            id: roleId,
                            allow: [
                                PermissionsBitField.Flags.ViewChannel,
                                PermissionsBitField.Flags.SendMessages,
                                PermissionsBitField.Flags.ReadMessageHistory,
                                PermissionsBitField.Flags.EmbedLinks,
                                PermissionsBitField.Flags.AttachFiles,
                                PermissionsBitField.Flags.AddReactions,
                                PermissionsBitField.Flags.UseExternalEmojis,
                                PermissionsBitField.Flags.UseApplicationCommands,
                                PermissionsBitField.Flags.ManageWebhooks,
                                // si jamais ajouté d'autre permission ici en ajouté :  ex de perm a ajouté, ne pas oublié de modifier la var Client en haut
                                // PermissionsBitField.Flags.ManageThreads,
                                //PermissionsBitField.Flags.UseSlashCommands,
                                // PermissionsBitField.Flags.CreatePublicThreads,
                                // PermissionsBitField.Flags.CreatePrivateThreads
                            ]
                        },
                        {
                            id: '1155453304659259472',
                            deny: [PermissionsBitField.Flags.ViewChannel],
                        }
                    ]
                });
            }
        }
    }
};
