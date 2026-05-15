const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Admin = require("../../models/admin");

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    const adminUser = await Admin.findOne({ email });

    if (!adminUser) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const isPasswordSame = await bcrypt.compare(
      password,
      adminUser.password
    );

    if (!isPasswordSame) {
      return res.status(401).json({
        message: "Invalid password",
      });
    }

    const token = jwt.sign(
      { id: adminUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // set true in production (HTTPS)
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      message: "Admin logged in successfully",
      adminUser: {
        email: adminUser.email,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = loginController;