const express = require("express");
const loginController = require("../controllers/auth/authController");
const forgotPasswordController = require("../controllers/auth/forgotPasswordController");
const resendOTPController = require("../controllers/auth/resendOTPController");
const resetPasswordController = require("../controllers/auth/resetPasswordController");
const logoutController = require("../controllers/auth/logOutController");
const authMiddleware = require("../middleware/auth");

const authRouter = express.Router();

authRouter.post('/login', loginController);
authRouter.post('/forgot-password', forgotPasswordController);
authRouter.post('/resend-otp', resendOTPController);
authRouter.post('/reset-password', resetPasswordController);
authRouter.post('/logout', logoutController);

authRouter.get("/me", authMiddleware, (req, res) => {
  res.status(200).json({
    message: "Authenticated",
    userId: req.user.id,
  });
});

module.exports = authRouter;