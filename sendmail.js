const nodemailer = require('nodemailer');

async function sendEmail(email, password) {
  // Créer un transporteur SMTP réutilisable à l'aide des paramètres SMTP
  let transporter = nodemailer.createTransport({
    host: 'smtp-relay.brevo.com',  // Vérifiez le bon host pour le service Brevo
    port: 587,
    secure: false, 
    auth: {
      user: '79zkpsxht5@privaterelay.appleid.com',  
      pass: '7P0kyKb1SWcgxhj8',  
    },
  });

  // Paramètres de l'e-mail
  let mailOptions = {
    from: 'YBUDDY <ybuddyEmail@example.com>', 
    to: email,
    subject: 'Votre mot de passe',
    text: `Votre mot de passe est "" `,
  };

  // Envoi de l'e-mail
  let info = await transporter.sendMail(mailOptions);

  console.log('Message sent: %s', info.messageId);
}

// Utilisation de la fonction pour envoyer l'e-mail
const email = "nils.jaudon@orange.fr";
const password = '7P0kyKb1SWcgxhj8'; 
sendEmail(email, password)
  .then(() => console.log('Email envoyé avec succès'))
  .catch((error) => console.error('Erreur lors de l\'envoi de l\'email :', error));
