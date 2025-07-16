import express from "express";
import { signupController } from "../controller/authController/signupController";
import { signupValidation } from "../middleware/userValidation/userSignupValidation";
import { signinValidation } from "../middleware/userValidation/userSigninValidation";
import { signinController } from "../controller/authController/signinController";
import {
  profileUpdateController,
  getUserController,
  profileImgUpdateController,
} from "../controller/userController/profileUpdateController";
import { verifyToken } from "../middleware/verifyToken";
import { verifyEmail } from "../middleware/email/verify-email";
import { changePasswordController } from "../controller/authController/changePasswordController";
import { verifyPasswordEmail } from "../middleware/email/verifyPasswordEmail";
import { upload } from "../middleware/uploads/uploadMiddleware";

export const router = express.Router();

router.post("/signup", signupValidation, signupController);
router.get("/verify-email/:token", verifyEmail);
router.get("/verify-password-email/:token", verifyPasswordEmail);

router.post("/signin", signinValidation, signinController);
router.patch("/update-password", changePasswordController); //for reseting password through email
router.post("/logout", (req, res) => {
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
router.patch(
  "/update-profile",
  upload.single("profileImg"),
  verifyToken,
  profileUpdateController
);
router.patch(
  "/update-profile-img",
  upload.single("profileImg"),
  verifyToken,
  profileImgUpdateController
);

router.get("/get-user", verifyToken, getUserController);
