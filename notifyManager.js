const nodemailer = require('nodemailer');
require('dotenv').config();

async function notifyManager(orderId, paymentTime) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: process.env.MANAGER_EMAIL,
    subject: 'Zelle Payment Received',
    text: `Order #${orderId} was paid via Zelle at ${paymentTime}.`,
  });
}

module.exports = { notifyManager };
