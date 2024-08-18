# Ynov Campus Discord Bot

## Présentation

Bienvenue sur le bot Discord d'Ynov Campus, un bot JavaScript construit à l'aide de [discord.js](https://discord.js.org/) pour gérer et automatiser diverses tâches sur le serveur Discord d'Ynov Campus.

## Fonctionnalités

- **Gestion des canaux**
  - Créer, supprimer et gérer les canaux avec facilité.
  
- **Gestion des rôles**
  - Créer, supprimer et gérer les rôles, y compris la gestion des permissions.
  
- **Attribution automatique des rôles**
  - Attribuer des rôles aux utilisateurs automatiquement en fonction de critères spécifiques.
  
- **Contrôle d'accès aux canaux**
  - Contrôler l'accès aux canaux spécifiques en fonction des rôles des utilisateurs.
  
- **Vérification par e-mail**
  - Vérifier l'authenticité des utilisateurs en envoyant un e-mail de confirmation et en validant le code reçu, garantissant ainsi une sécurité renforcée et une gestion simplifiée du serveur.

## Démarrage

Pour démarrer avec ce bot, suivez ces étapes :

1. **Cloner le dépôt** : 
   ```bash
   git clone https://github.com/[username]/ynov-campus-discord-bot.git
Installer les dépendances :

bash
Copy code
npm install
# ou
yarn install
Configurer le bot :
Créez un fichier config.json avec votre token de bot et d'autres paramètres.

Exécuter le bot :

bash
node index.js
Configuration
Le bot nécessite un fichier config.json avec les paramètres suivants :

token : Votre token de bot à partir du portail des développeurs Discord.
email : L'adresse e-mail utilisée pour la vérification.
emailPassword : Le mot de passe pour l'adresse e-mail.
Commandes
Le bot répond aux commandes suivantes :

!createchannel <nomDuCanal> : Créer un nouveau canal.
!deletechannel <nomDuCanal> : Supprimer un canal.
!createrole <nomDuRôle> : Créer un nouveau rôle.
!deleterole <nomDuRôle> : Supprimer un rôle.
!assignrole <nomDeLUtilisateur> <nomDuRôle> : Attribuer un rôle à un utilisateur.
!verify <adresseEmail> : Envoyer un e-mail de vérification à un utilisateur.
Licence
Ce projet est sous licence MIT. Voir LICENSE pour plus d'informations.

Remerciements
discord.js : Une bibliothèque JavaScript pour interagir avec l'API Discord.
Node.js : Un environnement d'exécution JavaScript.
Contributions
Les contributions sont les bienvenues ! Si vous souhaitez contribuer à ce projet, suivez ces étapes :

Forker le dépôt :

bash
Copy code
git fork https://github.com/[username]/ynov-campus-discord-bot.git
Créer une nouvelle branche :

bash
Copy code
git checkout -b [nomDeLaBranche]
Faire des modifications :
Décrivez brièvement les modifications que vous souhaitez apporter.

Soumettre une demande de tirage :

bash
Copy code
git push origin [nomDeLaBranche]
