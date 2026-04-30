const router = require("express").Router();
const crypto = require("crypto");
const Admin = require("../models/Admin");
const otpStore = require("../utils/otpStore");
const { sendMail } = require("../utils/mailer");

router.post("/send-otp", async (_req, res) => {
  try {
    const admin = await Admin.findOne();
    if (!admin) {
      return res
        .status(404)
        .json({ success: false, message: "No admin account found" });
    }

    const otp = crypto.randomInt(100000, 999999).toString();
    otpStore.set(admin.email, otp);

    await sendMail(
      admin.email,
      "DESAM Admin — Password Reset OTP",
      `
        <h2>Password Reset</h2>
        <p>Your one-time password is:</p>
        <h1 style="letter-spacing:4px">${otp}</h1>
        <p>This OTP expires in <strong>5 minutes</strong>.</p>
        <p>If you did not request this, please ignore this email.</p>
      `
    );

    res.json({ success: true, message: "OTP sent" });
  } catch (err) {
    console.error("send-otp error:", err);
    res.status(500).json({ success: false, message: "Failed to send OTP" });
  }
});

router.post("/verify-otp", (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res
      .status(400)
      .json({ success: false, message: "email and otp are required" });
  }

  const result = otpStore.verify(email, otp);
  if (!result.valid) {
    return res.status(400).json({ success: false, message: result.reason });
  }

  res.json({ success: true, message: "OTP verified" });
});

router.post("/reset-password", async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    if (!email || !newPassword) {
      return res
        .status(400)
        .json({ success: false, message: "email and newPassword required" });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters",
      });
    }

    const admin = await Admin.findOne({ email: email.toLowerCase() });
    if (!admin) {
      return res.status(404).json({ success: false, message: "Admin not found" });
    }

    admin.password = newPassword;
    await admin.save();

    res.json({ success: true, message: "Password updated" });
  } catch (err) {
    console.error("reset-password error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;
