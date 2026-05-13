const mongoose = require("mongoose");

const aboutUsTextSchema = new mongoose.Schema({
    content: {
        type: String,
        required: [true, "About us is required"],
        maxlength: [400, "About us content should not exceed 200 characters"]
    }
}, {
    timestamps: true
})

const aboutUsTextModel = mongoose.model("about-us", aboutUsTextSchema);

module.exports = aboutUsTextModel;