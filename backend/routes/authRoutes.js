const express = require("express");
const loginController = require("../controllers/auth/authController");
const forgotPasswordController = require("../controllers/auth/forgotPasswordController");
const resendOTPController = require("../controllers/auth/resendOTPController");
const resetPasswordController = require("../controllers/auth/resetPasswordController");

const authRouter = express.Router();

authRouter.post('/login', loginController);
authRouter.post('/forget-password', forgotPasswordController);
authRouter.post('/resend-otp', resendOTPController);
authRouter.post('/reset-password', resetPasswordController);

module.exports = authRouter;