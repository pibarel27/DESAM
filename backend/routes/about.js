const router = require("express").Router();
const About = require("../models/About");
const requireAuth = require("../middleware/requireAuth");

router.get("/", async (_req, res) => {
  try {
    const about = await About.findOne({ slug: "main" }).lean();
    return res.json({ success: true, data: about || null });
  } catch (err) {
    console.error("about get error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
});

router.post("/", requireAuth, async (req, res) => {
  try {
    const payload = req.body || {};

    const updated = await About.findOneAndUpdate(
      { slug: "main" },
      { $set: { ...payload, slug: "main" } },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    ).lean();

    return res.json({ success: true, data: updated });
  } catch (err) {
    console.error("about post error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;
