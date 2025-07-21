"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signupController = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userSchema_1 = require("../../model/userSchema");
const sendEmailVerification_1 = require("../../middleware/email/sendEmailVerification");
const signupController = async (req, res) => {
    try {
        const { fullname, email, password, phone } = req.body;
        const hashedPassword = await bcryptjs_1.default.hash(password, 12);
        const newUser = {
            fullname,
            email,
            password: hashedPassword,
            phone,
        };
        const secret = process.env.TOKEN_SECRET;
        if (!secret) {
            throw new Error("TOKEN_SECRET is not defined in environment variables");
        }
        const token = jsonwebtoken_1.default.sign({
            fullname,
            email,
            phone,
        }, secret, { expiresIn: "1h" });
        await userSchema_1.User.create(newUser);
        const link = `${process.env.CLIENT_URL}/api/auth/verify-email/${token}`;
        await (0, sendEmailVerification_1.sendEmailVerification)(email, link);
        return res.status(201).json({
            msg: `User created successflly. Please verifiy your account to login. Verification link is sent to ${email}`,
        });
    }
    catch (error) {
        return res.status(500).json({ msg: "User signup bad request", error });
    }
};
exports.signupController = signupController;
