// // ================= IMPORTS =================
// const express = require("express");
// const cors = require("cors");
// const nodemailer = require("nodemailer");

// // ================= APP SETUP =================
// const app = express();
// app.use(cors());
// app.use(express.json());

// // ================= OTP STORAGE =================
// // Format:
// // otpStore[email] = { otp: "123456", expires: timestamp }
// const otpStore = {};

// // ================= SEND OTP ROUTE =================
// app.post("/send-otp", async (req, res) => {
//   try {
//     const { email } = req.body;

//     if (!email) {
//       return res.status(400).json({ success: false, message: "Email required" });
//     }

//     // Generate 6-digit OTP (string)
//     const otp = Math.floor(100000 + Math.random() * 900000).toString();

//     // Store OTP with 5 minute expiry
//     otpStore[email] = {
//       otp: otp,
//       expires: Date.now() + 5 * 60 * 1000, // 5 minutes
//     };

//     // Create transporter
//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: "allindiaradioimphal3@gmail.com",
//         pass: "xrpsdaszliitewaf", // ⚠️ Put Gmail App Password here
//       },
//     });

//     // Send mail
//     await transporter.sendMail({
//       from: "allindiaradioimphal3@gmail.com",
//       to: email,
//       subject: "Admin Password Reset OTP",
//       text: `Your OTP is ${otp}. It will expire in 5 minutes.`,
//     });

//     console.log("OTP Sent:", otp);

//     res.json({ success: true, message: "OTP sent successfully" });

//   } catch (error) {
//     console.error("Error sending OTP:", error);
//     res.status(500).json({ success: false, message: "Failed to send OTP" });
//   }
// });

// // ================= VERIFY OTP ROUTE =================
// app.post("/verify-otp", (req, res) => {
//   const { email, otp } = req.body;

//   console.log("====== VERIFY DEBUG ======");
//   console.log("Entered Email:", email);
//   console.log("Entered OTP:", otp);
//   console.log("OTP Store Full:", otpStore);
//   console.log("Stored for this email:", otpStore[email]);
//   console.log("==========================");

// const stored = otpStore["allindiaradioimphal3@gmail.com"];
//   if (!stored) {
//     return res.json({ success: false, message: "No OTP found" });
//   }

//   if (String(otp) === String(stored.otp)) {
//     delete otpStore[email];
//     return res.json({ success: true });
//   }

//   res.json({ success: false, message: "Incorrect OTP" });
// });

// // ================= START SERVER =================
// app.listen(5000, () => {
//   console.log("Server running on http://localhost:5000");
// });
// ================= IMPORTS =================


// xrpsdaszliitewaf

const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const mongoose = require("mongoose");

const app = express();

app.use(cors());
app.use(express.json());

/* =======================
   MONGODB CONNECTION
======================= */
mongoose.connect("mongodb://127.0.0.1:27017/desamDB")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

/* =======================
   ABOUT SCHEMA
======================= */
const AboutSchema = new mongoose.Schema({
  aboutText: [String],
  vision: String,
  mission: String,
  values: String,
  team: [
    {
      name: String,
      role: String,
      desc: String,
      img: String
    }
  ]
});

const About = mongoose.model("About", AboutSchema);

/* =======================
   GET ABOUT DATA
======================= */
app.get("/api/about", async (req, res) => {
  try {
    const data = await About.findOne();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Error fetching data" });
  }
});

/* =======================
   SAVE ABOUT DATA
======================= */
app.post("/api/about", async (req, res) => {
  try {
    let data = await About.findOne();

    if (data) {
      data = await About.findOneAndUpdate({}, req.body, { new: true });
    } else {
      data = await About.create(req.body);
    }

    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Error saving data" });
  }
});

/* =======================
   OTP SYSTEM
======================= */

let currentOtp = null;
let otpExpiry = null;

app.post("/send-otp", async (req, res) => {
  try {
    const email = "allindiaradioimphal3@gmail.com";
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    currentOtp = otp;
    otpExpiry = Date.now() + 5 * 60 * 1000;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "allindiaradioimphal3@gmail.com",
        pass: "xrpsdaszliitewaf"
      }
    });

    await transporter.sendMail({
      from: email,
      to: email,
      subject: "Admin OTP",
      text: `Your OTP is ${otp}`
    });

    console.log("OTP SENT:", otp);

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false });
  }
});

app.post("/verify-otp", (req, res) => {
  const { otp } = req.body;

  if (!currentOtp) {
    return res.json({ success: false, message: "No OTP generated" });
  }

  if (Date.now() > otpExpiry) {
    currentOtp = null;
    return res.json({ success: false, message: "OTP expired" });
  }

  if (String(otp) === String(currentOtp)) {
    currentOtp = null;
    return res.json({ success: true });
  }

  res.json({ success: false, message: "Incorrect OTP" });
});

/* =======================
   START SERVER
======================= */
app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
const HeroSchema = new mongoose.Schema({
  title: String,
  motto: String,
  description: String
});

const Hero = mongoose.model("Hero", HeroSchema);

// GET Hero
app.get("/api/hero", async (req, res) => {
  try {
    const data = await Hero.findOne();
    res.json(data);
  } catch (err) {
    console.error("GET HERO ERROR:", err);
    res.status(500).json({ error: "Failed to fetch hero data" });
  }
});

// SAVE Hero
app.post("/api/hero", async (req, res) => {
  try {
    console.log("Incoming Hero Data:", req.body); // 👈 DEBUG

    let data = await Hero.findOne();

    if (data) {
      data = await Hero.findOneAndUpdate({}, req.body, { new: true });
    } else {
      data = await Hero.create(req.body);
    }

    res.json(data);
  } catch (err) {
    console.error("SAVE HERO ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});


// SAVE Hero
app.post("/api/hero", async (req, res) => {
  let data = await Hero.findOne();

  if (data) {
    data = await Hero.findOneAndUpdate({}, req.body, { new: true });
  } else {
    data = await Hero.create(req.body);
  }

  res.json(data);
});
