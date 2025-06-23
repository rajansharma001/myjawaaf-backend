import type { Request, Response, NextFunction } from "express";
import { User } from "../../model/userSchema.ts";
export const signinValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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
  } catch (error) {
    return res.status(500).json({ msg: "signin validation bad request" });
  }
};
