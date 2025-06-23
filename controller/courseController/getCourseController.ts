import type { Request, Response } from "express";
import { Course } from "../../model/courseSchema.ts";

export const getCourseController = async (req: Request, res: Response) => {
  try {
    const userId = req.user._id as string;

    if (!userId) {
      return res.status(404).json({ msg: "User not found." });
    }

    const getCourse = await Course.find({ createdBy: userId });

    return res.status(200).json({ msg: " Course fetched success.", getCourse });
  } catch (error) {
    return res.status(500).json({ msg: "Bad request for course fetch" });
  }
};
