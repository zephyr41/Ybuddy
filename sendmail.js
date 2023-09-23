const nodemailer = require('nodemailer');
const email = require('./commands/reply/email');

async function sendEmail(emailUser,codeUser) {
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
        to: emailUser,
        subject: 'Votre mot de passe',
        text: `Votre mot de passe est "" `, codeUser,
    };

    // Envoi de l'e-mail
    let info = await transporter.sendMail(mailOptions);

    console.log('Message sent: %s', info.messageId);
}
