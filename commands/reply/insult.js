const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('insult')
		.setDescription('Répond avec répartie :)')
		.addUserOption(option => option.setName('utilisateur').setDescription('L\'utilisateur qui va avoir un beau message :p').setRequired(true)),
	async execute(interaction) {
		const user = interaction.options.getUser('utilisateur');
		const motInsulte = choisirMotAleatoire();
		await interaction.reply(`${user} : ${motInsulte}`);
	},
};


const motsInsultes = [
	'tête de têtard',
	'gredin',
	'sac à puces',
	'espèce d\'épinard',
	'fils/fille de mouette',
	'capitaine de bateau-lavoir',
	'cornichon',
	'paltoquet',
	'philistin',
	'foutriquet',
	'scélérat',
	'mauviette',
	'malotru',
	'goujat',
	'vil faquin',
	'désembouteillé des alpages',
	'protozoaire',
	'ectoplasme',
	'cloporte',
	'coprophage',
	'fils/fille de colon',
	'coprolithes',
	'fécalomes',
	'raclure de bidet',
	'fumier',
	'matière à compost',
	'déchet non recyclable',
	'sac de boue',
	'ordure',
	'pourriture',
	'moisissure',
	'fond de benne',
	'je n\'ai pas envie de t\'insulter, j\'ai peur de salir l\'insulte',
	'au niveau bagage intellectuel, tu voyages léger',
	'patient zéro de la connerie',
	'bête à bêcher de la flotte',
	'fils de yack',
	'macroniste',
	'filloniste',
	'lepéniste',
	'mélenchoniste',
	'sarkozyste',
	'capitaliste',
	'antivax',
	'banquier',
	'consultant',
	'président de BDE (bureau des étudiants)',
	'trader',
	'fils de trader',
	'négociant de F-35',
	'andouille',
	'tocard',
	'bouffon',
	'zigoto',
	'saltimbanque',
	'pimfle',
	'takezen',
	'torr penn',
	'casse-gonades',
	'goulamas',
	'gougnafier',
	'pouffre',
	'figure d\'angoisse',
	'front d\'endive',
	'tronc de figuier',
	'guit',
	'allez bien vous faire cuire le cul',
];

function choisirMotAleatoire() {
	const indexAleatoire = Math.floor(Math.random() * motsInsultes.length);
	return motsInsultes[indexAleatoire];
}

// Appel de la fonction pour obtenir un mot aléatoire
