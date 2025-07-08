import type { Request, Response } from "express";
import { Course } from "../../model/courseSchema.ts";
import { Lesson } from "../../model/lessonSchema.ts";
import { CourseCategory } from "../../model/categorySchema.ts";
import { User } from "../../model/userSchema.ts";
import { Enrollment } from "../../model/enrollSchema.ts";

export const getPublicCourse = async (req: Request, res: Response) => {
  const getCourse = await Course.find({ isPublished: true });
  return res.status(200).json({ getCourse });
};

export const getPublicLesson = async (req: Request, res: Response) => {
  const id = req.params.id;
  console.log(id);
  const getLesson = await Lesson.find({ courseId: id });
  if (!getLesson) return res.status(404).json({ msg: "Lesson not found" });
  console.log(getLesson);
  return res.status(200).json({ getLesson });
};

export const getPublicCourseById = async (req: Request, res: Response) => {
  const _id = req.params.id;
  if (!_id) return res.status(404).json({ msg: "Params ID not found" });
  const getCourseById = await Course.findOne({ _id });
  return res.status(200).json({ getCourseById });
};

export const getPublicCategory = async (req: Request, res: Response) => {
  const getCat = await CourseCategory.find();
  if (!getCat) return res.status(404).json({ msg: "Cat not found" });
  return res.status(200).json({ getCat });
};

export const getPublicUser = async (req: Request, res: Response) => {
  try {
    const getUser = await User.find();
    if (!getUser) {
      return res.status(404).json({ msg: "User not found." });
    }
    return res.status(200).json({ getUser });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export const getEnrollById = async (req: Request, res: Response) => {
  try {
    console.log("running?");
    const userId = req.user;
    console.log("req user coming: ", req.user);
    console.log(userId);
    const getEnrollById = await Enrollment.find({ userId });
    if (!getEnrollById) {
      return res.status(404).json({ msg: "Enrollments not found" });
    }
    return res.status(200).json({ getEnrollById });
  } catch (error) {
    return res.status(500).json({ msg: "Bad Request for enroll fetch" });
  }
};
