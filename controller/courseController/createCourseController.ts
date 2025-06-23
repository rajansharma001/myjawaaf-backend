import type { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { Course } from "../../model/courseSchema.ts";
export const createCourseController = async (req: Request, res: Response) => {
  try {
    const {
      title,
      slug,
      description,
      thumbnail,
      categoryId,
      isFree,
      price,
      discount,
      level,
      language,
      isPublished,
    } = req.body;

    // const token = req.cookies.token;
    // const decodeToken = await jwt.verify(token, process.env.TOKEN_SECRET);

    const currentUser = req.user;

    if (currentUser.role === "admin" || currentUser.role === "teacher") {
      const newCourse = {
        title,
        slug,
        description,
        thumbnail,
        categoryId,
        isFree,
        price,
        discount,
        level,
        language,
        isPublished,
        createdBy: currentUser._id,
      };
      const course = await Course.create(newCourse);
      return res.status(201).json({ msg: "Course Created Success!", course });
    } else {
      return res
        .status(405)
        .json({ msg: "You are not allowed to manage this task." });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "Bad Request while creating a new course!" });
  }
};
