"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const signupController_1 = require("../controller/authController/signupController");
const userSignupValidation_1 = require("../middleware/userValidation/userSignupValidation");
const userSigninValidation_1 = require("../middleware/userValidation/userSigninValidation");
const signinController_1 = require("../controller/authController/signinController");
const profileUpdateController_1 = require("../controller/userController/profileUpdateController");
const verifyToken_1 = require("../middleware/verifyToken");
const verify_email_1 = require("../middleware/email/verify-email");
const changePasswordController_1 = require("../controller/authController/changePasswordController");
const verifyPasswordEmail_1 = require("../middleware/email/verifyPasswordEmail");
const uploadMiddleware_1 = require("../middleware/uploads/uploadMiddleware");
exports.router = express_1.default.Router();
exports.router.post("/signup", userSignupValidation_1.signupValidation, signupController_1.signupController);
exports.router.get("/verify-email/:token", verify_email_1.verifyEmail);
exports.router.get("/verify-password-email/:token", verifyPasswordEmail_1.verifyPasswordEmail);
exports.router.post("/signin", userSigninValidation_1.signinValidation, signinController_1.signinController);
exports.router.patch("/update-password", changePasswordController_1.changePasswordController); //for reseting password through email
exports.router.post("/logout", (req, res) => {
    res.clearCookie("token", {
        // httpOnly: true,    // for local
        // secure: process.env.NODE_ENV === "production",  // for local
        // sameSite: "lax",  // for local
        // path: "/",  // for local
        httpOnly: true,
        secure: true, // for production
        sameSite: "none", // for production
        expires: new Date(0), // Expire immediately
        path: "/",
    });
    console.log("logged out");
    res.status(200).json({ msg: "User logged out" });
});
exports.router.patch("/update-profile", uploadMiddleware_1.upload.single("profileImg"), verifyToken_1.verifyToken, profileUpdateController_1.profileUpdateController);
exports.router.patch("/update-profile-img", uploadMiddleware_1.upload.single("profileImg"), verifyToken_1.verifyToken, profileUpdateController_1.profileImgUpdateController);
exports.router.get("/get-user", verifyToken_1.verifyToken, profileUpdateController_1.getUserController);
