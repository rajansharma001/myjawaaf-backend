"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyPasswordEmail = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userSchema_1 = require("../../model/userSchema");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const verifyPasswordEmail = async (req, res) => {
    try {
        const { newPassword } = req.body;
        if (!newPassword || newPassword.length < 6) {
            return res
                .status(400)
                .json({ msg: "Password must be at least 6 characters." });
        }
        const { token } = req.params;
        const secret = process.env.TOKEN_SECRET;
        if (!secret) {
            throw new Error("TOKEN_SECRET is not defined in environment variables");
        }
        const decode = jsonwebtoken_1.default.verify(token, secret);
        const existingUser = await userSchema_1.User.findOne({ email: decode.email });
        if (!existingUser) {
            return res.status(404).json({ msg: "User not found" });
        }
        if (!existingUser.isVerified) {
            return res.status(403).json({ msg: "User not verified" });
        }
        const hashNewPassword = await bcryptjs_1.default.hash(newPassword, 12);
        existingUser.password = hashNewPassword;
        await existingUser.save();
        return res.status(200).json({ msg: "password updated success" });
    }
    catch (error) {
        console.error("Password reset error:", error);
        return res.status(500).json({ msg: "Bad Request for password updatation" });
    }
};
exports.verifyPasswordEmail = verifyPasswordEmail;
