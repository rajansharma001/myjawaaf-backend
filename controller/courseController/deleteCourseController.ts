import type { Request, Response } from "express";
import { Course } from "../../model/courseSchema.ts";
export const deleteCourseController = async (req: Request, res: Response) => {
  const _id = req.params.id;
  const createdBy = req.user._id;

  const course = await Course.findOne({ _id });
  if (!course) {
    return res.status(404).json({ msg: "Course not found." });
  }

  const getCourse = await Course.deleteOne({ _id: _id, createdBy: createdBy });
  if (getCourse) {
    return res.status(200).json({ msg: "Course deleted!" });
  }

  return res.status(200).json({ msg: "doing good" });
};
