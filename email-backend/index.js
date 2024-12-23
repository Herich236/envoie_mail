const express = require('express');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Configurer le transporteur Nodemailer
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false, // Fake SMTP n'utilise pas TLS
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Endpoint pour envoyer un email
app.post('/send-email', async (req, res) => {
  const { to, subject, text } = req.body;

  try {
    await transporter.sendMail({
      from: '"Fake SMTP" <noreply@example.com>',
      to,
      subject,
      text,
    });

    res.status(200).json({ success: true, message: 'Email envoyé avec succès !' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Échec de l’envoi de l’email.', error: error.message });
  }
});

// Démarrage du serveur
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Backend en cours d'exécution sur http://localhost:${PORT}`);
});