import type { Request, Response } from "express";
import { Course } from "../../model/courseSchema.ts";
import { Lesson } from "../../model/lessonSchema.ts";
import { CourseCategory } from "../../model/categorySchema.ts";

export const getPublicCourse = async (req: Request, res: Response) => {
  const getCourse = await Course.find();
  return res.status(200).json(getCourse);
};

export const getPublicLesson = async (req: Request, res: Response) => {
  const getLesson = await Lesson.find();
  return res.status(200).json(getLesson);
};

export const getPublicCourseById = async (req: Request, res: Response) => {
  const _id = req.params.id;
  if (_id) return res.status(404).json({ msg: "Params ID not found" });
  const getCourseById = await Course.findOne({ _id });
  return res.status(200).json(getCourseById);
};

export const getPublicCategory = async (req: Request, res: Response) => {
  const getCat = await CourseCategory.find();
  console.log("👉 getCat:", getCat); // 🔍 add this log

  console.log("Category coming or not: ", getCat);
  if (!getCat) return res.status(404).json({ msg: "Cat not found" });
  return res.status(200).json(getCat);
};
