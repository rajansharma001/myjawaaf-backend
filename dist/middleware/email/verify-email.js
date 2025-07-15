"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyEmail = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userSchema_ts_1 = require("../../model/userSchema.ts");
const verifyEmail = async (req, res) => {
    try {
        const secret = process.env.TOKEN_SECRET;
        if (!secret) {
            throw new Error("TOKEN_SECRET is not defined in environment variables");
        }
        const { token } = req.params;
        const decode = jsonwebtoken_1.default.verify(token, secret);
        const user = await userSchema_ts_1.User.findOne({ email: decode.email });
        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }
        if (user.isVerified) {
            return res.status(403).json({ msg: "User already verified" });
        }
        user.isVerified = true;
        await user.save();
        return res.status(200).json({ msg: "User verified success" });
    }
    catch (error) {
        return res.status(500).json({ msg: "Bad Request for User verification" });
    }
};
exports.verifyEmail = verifyEmail;
