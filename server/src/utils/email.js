const nodemailer = require('nodemailer');
const ejs = require('ejs');
const { convert } = require('html-to-text');
const path = require('path');
const fs = require('fs/promises');

class Email {
  constructor(user, url, data = {}) {
    this.to = user.email;
    this.firstName = user.name ? user.name.split(' ')[0] : 'User';
    this.url = url || '';
    this.from = process.env.EMAIL_FROM || `Portfolio Admin <${process.env.EMAIL_USERNAME}>`;
    this.data = data;
  }

  // Create a new nodemailer transport
  newTransport() {
    if (process.env.NODE_ENV === 'production') {
      // Use SendGrid for production
      return nodemailer.createTransport({
        service: 'SendGrid',
        auth: {
          user: process.env.SENDGRID_USERNAME,
          pass: process.env.SENDGRID_PASSWORD
        }
      });
    }

    // Use Mailtrap for development
    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST || 'smtp.mailtrap.io',
      port: process.env.EMAIL_PORT || 2525,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD
      }
    });
  }

  // Render email template
  async renderTemplate(template, data) {
    try {
      const templatePath = path.join(__dirname, `../views/emails/${template}.ejs`);
      const templateContent = await fs.readFile(templatePath, 'utf-8');
      return ejs.render(templateContent, { ...this.data, ...data });
    } catch (error) {
      console.error('Error rendering email template:', error);
      throw new Error('Error rendering email template');
    }
  }

  // Send the actual email
  async send(template, subject) {
    try {
      // 1) Render HTML based on EJS template
      const html = await this.renderTemplate(template, {
        name: this.firstName,
        resetUrl: this.url,
        subject,
        year: new Date().getFullYear()
      });

      // 2) Define email options
      const mailOptions = {
        from: this.from,
        to: this.to,
        subject,
        html,
        text: convert(html, { wordwrap: 130 })
      };

      // 3) Create a transport and send email
      await this.newTransport().sendMail(mailOptions);
    } catch (error) {
      console.error('Error sending email:', error);
      throw new Error('There was an error sending the email. Please try again later.');
    }
  }

  // Send welcome email
  async sendWelcome() {
    await this.send('welcome', 'Welcome to Portfolio Admin');
  }

  // Send password reset email
  async sendPasswordReset() {
    await this.send('reset-password', 'Reset Your Password');
  }

  // Send contact form submission confirmation
  async sendContactConfirmation() {
    await this.send('contact-confirmation', 'We\'ve Received Your Message');
  }

  // Send new message notification to admin
  async sendNewMessageNotification() {
    await this.send('new-message-notification', 'New Message Received');
  }
}

// Helper function to send emails without creating a class instance
const sendEmail = async (options) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST || 'smtp.mailtrap.io',
      port: process.env.EMAIL_PORT || 2525,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD
      },
      tls: {
        rejectUnauthorized: false // For self-signed certificates in development
      }
    });

    const mailOptions = {
      from: options.from || process.env.EMAIL_FROM || 'Portfolio Admin <noreply@portfolio.com>',
      to: options.to,
      subject: options.subject,
      text: options.text,
      html: options.html
    };

    if (options.attachments) {
      mailOptions.attachments = options.attachments;
    }

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Failed to send email');
  }
};

module.exports = {
  Email,
  sendEmail
};
