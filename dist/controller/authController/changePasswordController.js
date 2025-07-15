"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.changePasswordController = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userSchema_ts_1 = require("../../model/userSchema.ts");
const sendEmailVerification_ts_1 = require("../../middleware/email/sendEmailVerification.ts");
const changePasswordController = async (req, res) => {
    try {
        const { email } = req.body;
        const existingUser = await userSchema_ts_1.User.findOne({ email });
        if (!existingUser) {
            return res.status(403).json({ msg: "User not registered." });
        }
        const secret = process.env.TOKEN_SECRET;
        if (!secret) {
            throw new Error("TOKEN_SECRET is not defined in environment variables");
        }
        const token = jsonwebtoken_1.default.sign({
            fullname: existingUser.fullname,
            email: existingUser.email,
            phone: existingUser.phone,
            role: existingUser.role,
        }, secret, { expiresIn: "1h" });
        const link = `${process.env.CLIENT_URL}/api/auth/verify-password-email/${token}`;
        await (0, sendEmailVerification_ts_1.sendEmailVerification)(existingUser.email, link);
        return res.status(200).json({
            msg: `Password updated link has been sent to ${email}. Please verify your email to update your password`,
        });
    }
    catch (error) {
        return res.status(500).json({ msg: "Password updated Bad Request" });
    }
};
exports.changePasswordController = changePasswordController;
