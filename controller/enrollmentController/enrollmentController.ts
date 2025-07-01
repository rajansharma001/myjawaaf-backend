import type { Request, Response } from "express";
import { Course } from "../../model/courseSchema.ts";
import { Enrollment } from "../../model/enrollSchema.ts";

export const createEnrollmentController = async (
  req: Request,
  res: Response
) => {
  try {
    const _id = req.params.id;
    const userId = req.user._id;
    const getCourse = await Course.findOne({ _id });
    const getEnrollments = await Enrollment.findOne({ courseId: _id });
    if (getEnrollments) {
      return res
        .status(403)
        .json({ msg: "you already enrolled in this course." });
    }

    const newEnrollment = {
      userId: userId,
      courseId: getCourse._id,
      isFree: getCourse.isFree,
    };
    await Enrollment.create(newEnrollment);
    return res.status(200).json({ msg: "Enrollment created." });
  } catch (error) {
    return res.status(500).json({ msg: "Bad request for Enrollment." });
  }
};
