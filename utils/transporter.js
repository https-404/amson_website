// ./utils/transporter.js

const nodemailer = require('nodemailer');

let transporter;

// Create transporter only if running on the server side
if (typeof window === 'undefined') {
  transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
} else {
  // Provide a fallback or handle differently if needed for client-side usage
  transporter = {
    sendMail: () => Promise.reject(new Error('Nodemailer cannot be used on client side')),
  };
}

module.exports = transporter;
