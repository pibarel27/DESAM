const nodemailer = require("nodemailer")

const sendEmail = async(email, subject, text) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.ADMIN_EMAIL,
            pass: process.env.ADMIN_PASSWORD
        }
    })
    await transporter.sendMail({
        from: process.env.ADMIN_EMAIL,
        to: email,
        subject,
        text

    })
}

module.exports = sendEmail;