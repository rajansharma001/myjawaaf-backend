"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signupValidation = void 0;
const userSchema_ts_1 = require("../../model/userSchema.ts");
const signupValidation = async (req, res, next) => {
    try {
        const { fullname, email, password, phone } = req.body;
        if (!fullname || !email || !password || !phone) {
            return res.status(401).json({ msg: "Please fill all the empty fields!" });
        }
        const existingUser = await userSchema_ts_1.User.findOne({ email });
        if (existingUser) {
            return res.status(401).json({ msg: "User already registered." });
        }
        const validEmail = /\S+@\S+\.\S+/.test(email);
        if (!validEmail) {
            return res.status(401).json({ msg: "Invalid Email." });
        }
        if (password.length < 6) {
            return res.status(401).json({ msg: "Password must be 6 charater long." });
        }
        console.log("Validation passed");
        next();
    }
    catch (error) {
        return res.status(500).json({ msg: "signup validation bad request" });
    }
};
exports.signupValidation = signupValidation;
