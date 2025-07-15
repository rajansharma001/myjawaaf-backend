"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signinValidation = void 0;
const signinValidation = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(401).json({ msg: "Please fill all the empty fields!" });
        }
        const validEmail = /\S+@\S+\.\S+/.test(email);
        if (!validEmail) {
            return res.status(401).json({ msg: "Invalid Email." });
        }
        if (password.length < 6) {
            return res.status(401).json({ msg: "Password must be 6 charater long." });
        }
        next();
    }
    catch (error) {
        return res.status(500).json({ msg: "signin validation bad request" });
    }
};
exports.signinValidation = signinValidation;
