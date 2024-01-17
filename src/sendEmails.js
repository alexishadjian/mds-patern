// sendEmails.js

// Importe le module Nodemailer qui permet d'envoyer des e-mails
const nodemailer = require('nodemailer');

// Fonction asynchrone pour envoyer un e-mail
const sendEmail = async (to, subject, text) => {
  // Configure pour le service Mailtrap (utilisé pour le développement et le test)
  const mailtrapConfig = {
    host: 'smtp.mailtrap.io',
    port: 2525,
    auth: {
      user: 'e18dd940f84ea5',
      pass: '81022fa280c7bc'
    }
  };

  // Crée un objet transporter avec la configuration de Mailtrap
  const transporter = nodemailer.createTransport(mailtrapConfig);

  // Options de l'e-mail à envoyer
  const mailOptions = {
    from: 'votre_adresse_email@example.com', // Adresse e-mail de l'expéditeur
    to: to, // Adresse e-mail du destinataire
    subject: subject, // Objet de l'e-mail
    text: text // Contenu de l'e-mail au format texte
  };

  try {
    // Envoye l'e-mail et attendre la réponse (info contient des détails sur l'envoi)
    const info = await transporter.sendMail(mailOptions);
    console.log(`E-mails envoyés avec succès : ${info.messageId}`);
  } catch (error) {
    // Gére les erreurs lors de l'envoi des e-mails
    console.error(`Erreur lors de l'envoi des e-mails : ${error.message}`);
  }
};

// Exporte la fonction sendEmail pour pouvoir l'utiliser dans d'autres fichiers
module.exports = sendEmail;
