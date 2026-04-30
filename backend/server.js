const path = require("path");
const fs = require("fs");

const envPath = path.join(__dirname, ".env");
const envExamplePath = path.join(__dirname, ".env.example");
require("dotenv").config({
  path: fs.existsSync(envPath) ? envPath : envExamplePath,
});
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const adminRoutes = require("./routes/admin");
const aboutRoutes = require("./routes/about");
const contactRoutes = require("./routes/contact");

const app = express();

// ─── Middleware ───────────────────────────────────────────────────────────────
app.use(cors({ origin: process.env.CLIENT_URL || "http://localhost:3000" }));
app.use(express.json());

// ─── Routes ──────────────────────────────────────────────────────────────────
app.use("/api/admin", adminRoutes);   // POST /api/admin/login
app.use("/api/about", aboutRoutes);   // GET  /api/about  •  POST /api/about
app.use("/api/contact", contactRoutes); // POST /api/contact/send-message

// Legacy OTP routes that the frontend calls directly on /
app.use("/", require("./routes/otp")); // POST /send-otp  •  POST /verify-otp

// ─── Health check ────────────────────────────────────────────────────────────
app.get("/health", (_req, res) => res.json({ status: "ok" }));

// ─── DB + server ─────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI || typeof MONGO_URI !== "string") {
  console.error(
    "❌ Missing MONGO_URI. Create backend/.env (copy from backend/.env.example) and set MONGO_URI."
  );
  process.exit(1);
}

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
    if (String(err.message || "").includes("ECONNREFUSED")) {
      console.error(
        [
          "",
          "MongoDB appears to be unreachable (service not running or wrong host/port).",
          `MONGO_URI=${MONGO_URI}`,
          "",
          "Quick fix options:",
          "- Start local MongoDB service, then restart this server",
          '- Or run MongoDB with Docker: docker run -d --name desam-mongo -p 27017:27017 -v desam-mongo:/data/db mongo:7',
          "- Or switch MONGO_URI to a MongoDB Atlas connection string",
        ].join("\n")
      );
    }
    process.exit(1);
  });
