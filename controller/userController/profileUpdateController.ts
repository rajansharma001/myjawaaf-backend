import type { Request, Response } from "express";
import { User } from "../../model/userSchema.ts";
export const profileUpdateController = async (req: Request, res: Response) => {
  try {
    const currentUser = req.user;
    const { fullname, phone, bio, country } = req.body;
    const email = currentUser.email;

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(403).json({ msg: "User is not found!" });
    }

    const newUserDetails = {
      fullname,
      phone,
      bio,
      country,
    };

    await User.updateOne({ email }, newUserDetails);

    return res.status(200).json({ msg: "Profile Updated!" });
  } catch (error) {
    console.error("Profile update error:", error);
    return res.status(500).json({ msg: "Internal server error" });
  }
};
