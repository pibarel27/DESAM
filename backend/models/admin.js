const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true
    },
    password: {
        type: String,
        minlength: [8, "Password should have minimum of 8 characters"],
        required: [true, "Password is required"]
    },
    otp: {
      type: String,
      default: null,
    },
    otpExpiry: {
      type: Date,
      default: null,
    },    
}, {
    timestamps: true
})

const adminModel = mongoose.model("admin", adminSchema);

module.exports = adminModel;