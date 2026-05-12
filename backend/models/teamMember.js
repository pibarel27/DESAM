const mongoose = require("mongoose");

const teamMemberSchema = new mongoose.Schema({
    photo: {
        type: String,
        required: [true, "Photo is required"]
    },
    name: {
        type: String,
        required: [true, "Name is required"],
        unique: [true, "Name is already taken"]
    },
    role: {
        type: String,
        required: [true, "Roles is required"]
    },
    description: {
        type: String,
        maxlength : [200, "Description cannot exceed 200 characters"]
    }
})

const teamMemberModel = mongoose.model("teamMember", teamMemberSchema);
module.exports = teamMemberModel;