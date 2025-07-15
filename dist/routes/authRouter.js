"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const signupController_ts_1 = require("../controller/authController/signupController.ts");
const userSignupValidation_ts_1 = require("../middleware/userValidation/userSignupValidation.ts");
const userSigninValidation_ts_1 = require("../middleware/userValidation/userSigninValidation.ts");
const signinController_ts_1 = require("../controller/authController/signinController.ts");
const profileUpdateController_ts_1 = require("../controller/userController/profileUpdateController.ts");
const verifyToken_ts_1 = require("../middleware/verifyToken.ts");
const verify_email_ts_1 = require("../middleware/email/verify-email.ts");
const changePasswordController_ts_1 = require("../controller/authController/changePasswordController.ts");
const verifyPasswordEmail_ts_1 = require("../middleware/email/verifyPasswordEmail.ts");
const uploadMiddleware_ts_1 = require("../middleware/uploads/uploadMiddleware.ts");
exports.router = express_1.default.Router();
exports.router.post("/signup", userSignupValidation_ts_1.signupValidation, signupController_ts_1.signupController);
exports.router.get("/verify-email/:token", verify_email_ts_1.verifyEmail);
exports.router.get("/verify-password-email/:token", verifyPasswordEmail_ts_1.verifyPasswordEmail);
exports.router.post("/signin", userSigninValidation_ts_1.signinValidation, signinController_ts_1.signinController);
exports.router.patch("/update-password", changePasswordController_ts_1.changePasswordController); //for reseting password through email
exports.router.post("/logout", (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
    });
    console.log("logged out");
    res.status(200).json({ msg: "User logged out" });
});
exports.router.patch("/update-profile", uploadMiddleware_ts_1.upload.single("profileImg"), verifyToken_ts_1.verifyToken, profileUpdateController_ts_1.profileUpdateController);
exports.router.patch("/update-profile-img", uploadMiddleware_ts_1.upload.single("profileImg"), verifyToken_ts_1.verifyToken, profileUpdateController_ts_1.profileImgUpdateController);
exports.router.get("/get-user", verifyToken_ts_1.verifyToken, profileUpdateController_ts_1.getUserController);
