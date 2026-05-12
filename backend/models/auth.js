const mongoose = require("mongoose");

const authSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true
    },
    password: {
        type: String,
        minlength: [8, "Password should have minimum of 8 characters"],
        required: [true, "Password is required"]
    }
}, {
    timestamps: true
})

const authModel = mongoose.model("admin", authSchema);

module.exports = authModel;