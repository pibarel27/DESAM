const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.ADMIN_EMAIL,
    pass: process.env.ADMIN_PASSWORD,
  },
});

const sendEmail = async (email, subject, text) => {
  await transporter.sendMail({
    from: `"Admin Panel" <${process.env.ADMIN_EMAIL}>`,
    to: email,
    subject,
    text,
  });
};

module.exports = sendEmail;