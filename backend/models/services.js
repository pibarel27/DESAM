const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema(
  {
    photo: {
      type: String,
      required: [true, "Photo is required"],
    },
    heading: {
      type: String,
      required: [true, "Heading is required"],
      trim: true,
      maxlength: [50, "Heading cannot exceed 100 characters"]
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
      maxlength: [200, "Description cannot exceed 200 characters"]
    },
  },
  {
    timestamps: true,
  },
);

const serviceModel = mongoose.model("services", serviceSchema);
module.exports = serviceModel;
