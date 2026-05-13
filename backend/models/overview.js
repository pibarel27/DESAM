const mongoose = require("mongoose");

const overviewSchema = new mongoose.Schema({
    vision: {
        type: String,
        required: [true, "Vision is required"],
        maxlength: [200, "Vision should not exceed 200 characters"]
    },
    mission: {
        type: String,
        required: [true, "Mission is required"],
        maxlength: [200, "Mission should not exceed 200 characters"]
    },
    values: {
        type: String,
        required: [true, "Values is required"],
        maxlength: [300, "Values should not exceed 300 characters"]
    }
}, {
    timestamps: true
})

const introModel = mongoose.model("overview", overviewSchema);

module.exports = introModel;