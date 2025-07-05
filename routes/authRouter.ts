import express from "express";
import { signupController } from "../controller/authController/signupController.ts";
import { signupValidation } from "../middleware/userValidation/userSignupValidation.ts";
import { signinValidation } from "../middleware/userValidation/userSigninValidation.ts";
import { signinController } from "../controller/authController/signinController.ts";
import { profileUpdateController, getUserController } from "../controller/userController/profileUpdateController.ts";
import { verifyToken } from "../middleware/verifyToken.ts";
import { verifyEmail } from "../middleware/email/verify-email.ts";
import { changePasswordController } from "../controller/authController/changePasswordController.ts";
import { verifyPasswordEmail } from "../middleware/email/verifyPasswordEmail.ts";

export const router = express.Router();

router.post("/signup", signupValidation, signupController);
router.get("/verify-email/:token", verifyEmail);
router.get("/verify-password-email/:token", verifyPasswordEmail);

router.post("/signin", signinValidation, signinController);
router.patch("/update-password", changePasswordController); //for reseting password through email
router.post("/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  });
  console.log("logged out");
  res.status(200).json({ msg: "User logged out" });
});
router.patch("/update-profile", verifyToken, profileUpdateController);


router.get("/get-user", verifyToken, getUserController);

   