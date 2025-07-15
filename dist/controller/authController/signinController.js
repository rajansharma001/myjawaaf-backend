"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signinController = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userSchema_ts_1 = require("../../model/userSchema.ts");
const signinController = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log("input from frontend: ", req.body);
        const existingUser = await userSchema_ts_1.User.findOne({ email });
        console.log("existing user: ", existingUser);
        if (!existingUser) {
            return res
                .status(401)
                .json({ msg: "User not registered. Please register first." });
        }
        if (!existingUser.isVerified) {
            return res.status(403).json({ msg: "User not verified." });
        }
        const checkPassword = await bcryptjs_1.default.compare(password, existingUser.password);
        if (!checkPassword) {
            return res.status(401).json({ msg: "Password did not match!" });
        }
        const secret = process.env.TOKEN_SECRET;
        if (!secret) {
            throw new Error("TOKEN_SECRET is not defined in environment variables");
        }
        const token = jsonwebtoken_1.default.sign({
            _id: existingUser._id,
            fullname: existingUser.fullname,
            email: existingUser.email,
            phone: existingUser.phone,
            role: existingUser.role,
            profileImg: existingUser.profileImg,
        }, secret, { expiresIn: "1h" });
        return res
            .cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 60 * 10 * 1000,
        })
            .status(200)
            .json({ msg: "Signedin success", token });
    }
    catch (error) {
        console.error("Signin error:", error);
        res.status(500).json({ msg: "Server error. Please try again." });
    }
};
exports.signinController = signinController;
