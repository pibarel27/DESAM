const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({
  name: String,
  role: String,
  desc: String,
  img: String
});

const aboutSchema = new mongoose.Schema({
  aboutText: [String],
  vision: String,
  mission: String,
  values: String,
  team: [teamSchema]
});

module.exports = mongoose.model("About", aboutSchema);
