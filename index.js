const fs = require('node:fs');  // Importation du module du système de fichiers de Node.js
const path = require('node:path');  // Importation du module de chemin de Node.js
const { Client, Collection, GatewayIntentBits, Events } = require('discord.js');  // Importation des composants nécessaires de la bibliothèque 'discord.js'
const { token } = require('./config.json');  // Importation du 'token' à partir du fichier 'config.json'


const client = new Client({ intents: [GatewayIntentBits.Guilds] });  // Création d'un nouveau client Discord avec les intentions spécifiées

client.commands = new Collection();  // Création d'une collection pour stocker les commandes

const foldersPath = path.join(__dirname, 'commands');  // Obtention du chemin du répertoire 'commands'
const commandFolders = fs.readdirSync(foldersPath);  // Lecture du contenu du répertoire 'commands'

// Parcours de chaque sous-répertoire dans 'commands'
for (const folder of commandFolders) {
  const commandsPath = path.join(foldersPath, folder);  // Obtention du chemin d'un dossier de commande spécifique
  const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));  // Obtention des fichiers JavaScript dans le dossier de commande

  // Parcours de chaque fichier de commande
  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);  // Obtention du chemin d'un fichier de commande spécifique
    const command = require(filePath);  // Exigence du fichier de commande

    // Vérification si la commande a les propriétés requises 'data' et 'execute'
    if ('data' in command && 'execute' in command) {
      client.commands.set(command.data.name, command);  // Ajout de la commande à la collection des commandes
    } else {
      console.log(`[AVERTISSEMENT] La commande à ${filePath} ne possède pas les propriétés requises "data" ou "execute".`);
    }
  }
}

const eventsPath = path.join(__dirname, 'events');  // Obtention du chemin du répertoire 'events'
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));  // Obtention des fichiers JavaScript dans le dossier des événements

// Parcours de chaque fichier d'événement
for (const file of eventFiles) {
  const filePath = path.join(eventsPath, file);  // Obtention du chemin d'un fichier d'événement spécifique
  const event = require(filePath);  // Exigence du fichier d'événement

  // Attachement du gestionnaire d'événements à l'événement approprié en fonction de s'il s'agit d'un événement unique ou non
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args));
  } else {
    client.on(event.name, (...args) => event.execute(...args));
  }
}

// Écoute des interactions et gestion des modaux
client.on(Events.InteractionCreate, async interaction => {
  if (!interaction.isModalSubmit()) return;  // Si ce n'est pas une soumission de modal, retourner

  // Remarque : le customId du modal doit correspondre à celui de la commande
  const command = interaction.client.commands.get(interaction.customId);  // Obtention de la commande en fonction du customId
  console.log(command);

  if (!command) {
    console.error(`Aucune commande correspondant à ${interaction.customId} n'a été trouvée`);
    return;
  }

  try {
    await command.handleModal(interaction);  // Appel de la fonction handleModal de la commande
  } catch (error) {
    console.log(`Erreur lors de l'exécution de ${interaction.commandName}`);
    console.log(error);
    if (interaction.replied || interaction.deferred) {
      await interaction.followUp({ content: 'Erreur lors de l\'execution', ephemeral: true });
    } else {
      await interaction.reply({ content: 'Erreur lors de l\'execution', ephemeral: true });
    }
  }
});

client.login(token);  // Connexion du client en utilisant le token fourni
