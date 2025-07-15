import type { Request, Response, NextFunction } from "express";
import { User } from "../../model/userSchema";
export const signupValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { fullname, email, password, phone } = req.body;

    if (!fullname || !email || !password || !phone) {
      return res.status(401).json({ msg: "Please fill all the empty fields!" });
    }
    const existingUser = await User.findOne({ email });

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
  } catch (error) {
    return res.status(500).json({ msg: "signup validation bad request" });
  }
};
