const Admin = require("../../models/admin");
const sendEmail = require("../../utils/sendEmail");

const forgotPasswordController = async(req,res) => {

    try {
        const {email} = req.body;
        
        const admin = await Admin.findOne({
            email
        })

        if(!admin) {
            return res.status(404).json({
                message: "Admin not found"
            })
        }

        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        admin.otp = otp;
        admin.otpExpiry = Date.now() + 5 * 60 * 1000;

        await admin.save();

        await sendEmail(email, "Password Reset OTP",
            `Your OTP for password reset is ${otp}`
        )   
        res.status(200).json({
        message: "OTP sent successfully",
        });             
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

module.exports = forgotPasswordController;