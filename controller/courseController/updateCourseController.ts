import type { Request, Response } from "express";
import { Course } from "../../model/courseSchema.ts";
import path from "path";
export const updateCourseController = async (req: Request, res: Response) => {
  try {
    const courseId = req.params.id;

    console.log("courseId: ", courseId);

    const checkCourse = await Course.findOne({ _id: courseId });
    if (!checkCourse) {
      return res.status(404).json({ msg: "Course not found." });
    }

    const {
      title,
      slug,
      description,
      categoryId,
      isFree,
      price,
      discount,
      level,
      language,
      isPublished,
    } = req.body;

    const user = req.user;
    const file = req.file;

    console.log("is file receiving: ", req.file);
    const thumbnailPath = file ? path.posix.join("uploads", file.filename) : "";

    await Course.updateOne(
      { _id: courseId, createdBy: user._id },
      {
        title,
        slug,
        description,
        thumbnail: thumbnailPath,
        categoryId,
        isFree,
        price,
        discount,
        level,
        language,
        isPublished,
      }
    );

    return res.status(200).json({ msg: "Course updated success" });
  } catch (error) {
    return res.status(500).json({ msg: "Bad Request while Course updated" });
  }
};
