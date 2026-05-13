const mongoose = require("mongoose");

const introSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Title is required"]
    },
    motto: {
        type: String,
        required: [true, "Motto is required"],
        maxlength: [200, "Motto should not exceed 200 characters"]
    },
    description: {
        type: String,
        required: [true, "Description is required"],
        maxlength: [300, "Description should not exceed 300 characters"]
    }
}, {
    timestamps: true
})

const introModel = mongoose.model("intro", introSchema);

module.exports = introModel;