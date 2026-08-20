const nodemailer = require('nodemailer');
const logger = require('./logger');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587', 10),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

/**
 * Send an email.
 * @param {{ to: string, subject: string, html: string, text?: string }} options
 */
async function sendEmail({ to, subject, html, text }) {
  if (!process.env.SMTP_HOST) {
    logger.warn('SMTP not configured — email not sent', { to, subject });
    return;
  }
  try {
    await transporter.sendMail({
      from: process.env.SMTP_FROM || '"Junubi Technologies" <hello@junubitech.com>',
      to,
      subject,
      html,
      text,
    });
    logger.info('Email sent', { to, subject });
  } catch (err) {
    logger.error('Failed to send email', { to, subject, error: err.message });
  }
}

module.exports = { sendEmail };
