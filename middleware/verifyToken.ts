import jwt from "jsonwebtoken";
import type { Request, Response, NextFunction } from "express";
export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ msg: "No token, access denied" });
    }

    const secret = process.env.TOKEN_SECRET;
    if (!secret) {
      throw new Error("TOKEN_SECRET is not defined in environment variables");
    }
    const decoded = await jwt.verify(token, secret);
    if (!decoded) {
      return res.status(401).json({ msg: "Invalid Token!" });
    }
    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({ msg: "Bad request. Invalid Token!" });
  }
};
