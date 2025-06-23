import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import type { Request, Response } from "express";
import { User } from "../../model/userSchema.ts";
export const signinController = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res
        .status(401)
        .json({ msg: "User not registered. Please register first." });
    }

    if (!existingUser.isVerified) {
      return res.status(403).json({ msg: "User not verified." });
    }
    const checkPassword = await bcrypt.compare(password, existingUser.password);

    if (!checkPassword) {
      return res.status(401).json({ msg: "Password did not match!" });
    }

    const token = jwt.sign(
      {
        _id: existingUser._id,
        fullname: existingUser.fullname,
        email: existingUser.email,
        phone: existingUser.phone,
        role: existingUser.role,
      },
      process.env.TOKEN_SECRET,
      { expiresIn: "1h" }
    );

    return res
      .cookie("token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        maxAge: 60 * 10 * 1000,
      })
      .status(200)
      .json({ msg: "Signedin success", token });
  } catch (error) {}
};
