import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import type { Request, Response } from "express";
import { User } from "../../model/userSchema";
import { sendEmailVerification } from "../../middleware/email/sendEmailVerification";
export const signupController = async (req: Request, res: Response) => {
  try {
    const { fullname, email, password, phone } = req.body;

    const hashedPassword = await bcrypt.hash(password, 12);
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

    const token = jwt.sign(
      {
        fullname,
        email,
        phone,
      },
      secret,
      { expiresIn: "1h" }
    );

    await User.create(newUser);

    const link = `${process.env.CLIENT_URL}/api/auth/verify-email/${token}`;
    await sendEmailVerification(email, link);
    return res.status(201).json({
      msg: `User created successflly. Please verifiy your account to login. Verification link is sent to ${email}`,
    });
  } catch (error) {
    return res.status(500).json({ msg: "User signup bad request", error });
  }
};
