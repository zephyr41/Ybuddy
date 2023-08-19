const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');
const { token } = require('./config.json');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// Crée une collection pour stocker les commandes
client.commands = new Collection();

// Chargement des commandes
const commandsPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(commandsPath);
for (const folder of commandFolders) {
	// eslint-disable-next-line no-inline-comments
	const folderPath = path.join(commandsPath, folder); // Renommé en folderPath
	const commandFiles = fs.readdirSync(folderPath).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const filePath = path.join(folderPath, file);
		const command = require(filePath);
		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
		}
		else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}

// Événement lorsqu'une interaction (commande) est créée
client.on(Events.InteractionCreate, interaction => {
	if (!interaction.isChatInputCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		command.execute(interaction);
	}
	catch (error) {
		console.error(error);
		interaction.reply({ content: 'Une erreur est survenue lors de l\'exécution de cette commande.', ephemeral: true });
	}
});

// Conxion à Discord
console.log('Connecting to Discord...');
client.login(token);