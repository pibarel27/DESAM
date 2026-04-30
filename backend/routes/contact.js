const router = require("express").Router();
const { sendMail } = require("../utils/mailer");

router.post("/send-message", async (req, res) => {
  try {
    const { username, email, subject, message } = req.body;

    if (!username || username.length < 2)
      return res.status(400).json({ success: false, message: "Name too short" });
    if (!email || email.length < 5)
      return res.status(400).json({ success: false, message: "Invalid email" });
    if (!subject || subject.length < 5)
      return res.status(400).json({ success: false, message: "Subject too short" });
    if (!message || message.length < 10)
      return res.status(400).json({ success: false, message: "Message too short" });

    await sendMail(
      process.env.EMAIL_USER,
      `[DESAM Contact] ${subject}`,
      `
        <h3>New message from ${username} (${email})</h3>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, "<br>")}</p>
      `
    );

    res.json({ success: true, message: "Message sent" });
  } catch (err) {
    console.error("contact send-message error:", err);
    res.status(500).json({ success: false, message: "Failed to send message" });
  }
});

module.exports = router;
