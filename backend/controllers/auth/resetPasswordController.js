const bcrypt = require("bcryptjs");
const Admin = require("../../models/admin");

const resetPasswordController = async (req, res) => {
  try {
    const { email, otp, password } = req.body;

    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(404).json({
        message: "Admin not found",
      });
    }

    if (admin.otp !== otp) {
      return res.status(400).json({
        message: "Invalid OTP",
      });
    }

    if (admin.otpExpiry < Date.now()) {
      return res.status(400).json({
        message: "OTP expired",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    admin.password = hashedPassword;
    admin.otp = null;
    admin.otpExpiry = null;

    await admin.save();

    res.status(200).json({
      message: "Password reset successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = resetPasswordController;