const mongoose = require("mongoose");

const teamMemberSchema = new mongoose.Schema({
  name: { type: String, default: "" },
  role: { type: String, default: "" },
  image: { type: String, default: "" },
  bio: { type: String, default: "" },
});

const aboutSchema = new mongoose.Schema(
  {
    slug: { type: String, default: "main", unique: true },
    aboutText: { type: [String], default: [] },
    vision: { type: String, default: "" },
    mission: { type: String, default: "" },
    values: { type: String, default: "" },
    team: { type: [teamMemberSchema], default: [] },
  },
  { timestamps: true }
);

module.exports = mongoose.model("About", aboutSchema);
