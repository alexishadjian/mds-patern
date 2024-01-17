// sendEmails.js 

const nodemailer = require('nodemailer');

// Exportez la fonction pour envoyer un e-mail avec des paramètres personnalisés
const sendEmail = async (to, subject, text) => {
  // Les informations d'authentification fournies par Mailtrap
  const mailtrapConfig = {
    host: 'smtp.mailtrap.io',
    port: 2525,
    auth: {
      user: 'e18dd940f84ea5',
      pass: '81022fa280c7bc'
    }
  };

  // Configurer le transport Nodemailer
  const transporter = nodemailer.createTransport(mailtrapConfig);

  const mailOptions = {
    from: 'votre_adresse_email@example.com',
    to: to,
    subject: subject,
    text: text
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`E-mails envoyés avec succès : ${info.messageId}`);
  } catch (error) {
    console.error(`Erreur lors de l'envoi des e-mails : ${error.message}`);
  }
};

module.exports = sendEmail;
