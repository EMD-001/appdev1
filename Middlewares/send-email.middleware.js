const nodemailer = require('nodemailer');
const pug = require('pug');
const path = require('path');

// ✅ Ensure .env is loaded
require('dotenv').config();

// ✅ Create a transporter (make sure PORT is a number)
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT), // <-- make sure this is a number
  secure: false, // false for port 587, true for port 465
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// ✅ Send email function
const sendEmail = async (book) => {
  try {
    // compile pug template
    const html = pug.renderFile(path.join(__dirname, '../views/bookCreated.pug'), {
      title: book.title,
      author: book.author,
      year: book.year,
    });

    // email options
    const mailOptions = {
      from: `"Book API" <${process.env.SMTP_USER}>`,
      to: process.env.RECIPIENT_EMAIL,
      subject: 'New Book Created',
      html,
    };

    // send email
    const info = await transporter.sendMail(mailOptions);

    console.log('✅ Email sent:', info.messageId);
    console.log('🔗 Preview URL:', nodemailer.getTestMessageUrl(info));
  } catch (err) {
    console.error('❌ Email sending failed:', err.message);
  }
};

module.exports = sendEmail;
