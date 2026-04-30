const router = require("express").Router();
const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");

function signToken(admin) {
  return jwt.sign(
    { id: admin._id.toString(), username: admin.username },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
}

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body || {};
    if (!username || !password) {
      return res
        .status(400)
        .json({ success: false, message: "username and password are required" });
    }

    const admin = await Admin.findOne({ username: String(username).trim() });
    if (!admin) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    const ok = await admin.matchPassword(String(password));
    if (!ok) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    const token = signToken(admin);
    return res.json({ success: true, token });
  } catch (err) {
    console.error("admin login error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
});

router.post("/seed", async (req, res) => {
  try {
    const { username, password, email, seedSecret } = req.body || {};

    if (!seedSecret || seedSecret !== process.env.SEED_SECRET) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    if (!username || !password || !email) {
      return res.status(400).json({
        success: false,
        message: "username, password, and email are required",
      });
    }

    const existing = await Admin.findOne({
      $or: [{ username: String(username).trim() }, { email: String(email).toLowerCase() }],
    });
    if (existing) {
      return res
        .status(409)
        .json({ success: false, message: "Admin already exists" });
    }

    const admin = await Admin.create({
      username: String(username).trim(),
      password: String(password),
      email: String(email).toLowerCase(),
    });

    return res.json({ success: true, id: admin._id.toString() });
  } catch (err) {
    console.error("admin seed error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;
