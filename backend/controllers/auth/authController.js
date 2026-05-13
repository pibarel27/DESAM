const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const cloudinary = require("../../config/cloudinary")
const Admin = require("../../models/admin");
const sendEmail = require("../../utils/sendEmail");

const loginController = async(req,res) => {
    const {email, password} = req.body;
    const adminUser = await Admin.findOne({
        email
    })
    if(!adminUser) {
        return res.status(404).json({
            message: "User not found"
        })
    }

    const isPasswordSame = await bcrypt.compare(password, adminUser.password);

    if(!isPasswordSame) {
        return res.status(401).json({
            message: "Password Invalid"
        })
    }
    const token = jwt.sign({id: adminUser._id}, process.env.JWT_SECRET, {
        expiresIn: "1d"
    })
    res.cookie("token", token)
    res.status(200).json({
        message: "Admin logged in successfully",
        adminUser: {
            email: adminUser.email
        }   
    })
}

module.exports = loginController;