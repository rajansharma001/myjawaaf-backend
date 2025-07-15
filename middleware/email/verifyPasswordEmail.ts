import type { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { User } from "../../model/userSchema.ts";
import bcrypt from "bcryptjs";

interface MyJwtPayload extends jwt.JwtPayload {
  email: string;
  fullname: string;
  phone?: string;
}
export const verifyPasswordEmail = async (req: Request, res: Response) => {
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
    const decode = jwt.verify(token, secret) as MyJwtPayload;

    const existingUser = await User.findOne({ email: decode.email });
    if (!existingUser) {
      return res.status(404).json({ msg: "User not found" });
    }

    if (!existingUser.isVerified) {
      return res.status(403).json({ msg: "User not verified" });
    }

    const hashNewPassword = await bcrypt.hash(newPassword, 12);
    existingUser.password = hashNewPassword;
    await existingUser.save();

    return res.status(200).json({ msg: "password updated success" });
  } catch (error) {
    console.error("Password reset error:", error);

    return res.status(500).json({ msg: "Bad Request for password updatation" });
  }
};
