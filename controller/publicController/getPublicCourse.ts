import type { Request, Response } from "express";
import { Course } from "../../model/courseSchema";
import { Lesson } from "../../model/lessonSchema";
import { CourseCategory } from "../../model/categorySchema";
import { User } from "../../model/userSchema";
import { Enrollment } from "../../model/enrollSchema";

export const getPublicCourse = async (req: Request, res: Response) => {
  const getCourse = await Course.find({ isPublished: true });
  return res.status(200).json({ getCourse });
};

// lesson by id
export const getPublicLesson = async (req: Request, res: Response) => {
  const id = req.params.id;
  console.log(id);
  const getLesson = await Lesson.find({ courseId: id });
  if (!getLesson) return res.status(404).json({ msg: "Lesson not found" });
  console.log(getLesson);
  return res.status(200).json({ getLesson });
};

// all lesson
export const getPublicLessons = async (req: Request, res: Response) => {
  const getLessons = await Lesson.find();
  if (!getLessons) return res.status(404).json({ msg: "Lessons not found" });
  console.log(getLessons);
  return res.status(200).json({ getLessons });
};

// fetch course by courseId
export const getPublicCourseById = async (req: Request, res: Response) => {
  const _id = req.params.id;
  if (!_id) return res.status(404).json({ msg: "Params ID not found" });
  const getCourseById = await Course.findOne({ _id });
  return res.status(200).json({ getCourseById });
};

// fetchcourse by user id

export const getPublicCourseByUserId = async (req: Request, res: Response) => {
  const _id = req.user._id;
  if (!_id) return res.status(404).json({ msg: "User ID not found" });
  const getCourseByUserId = await Course.find({ userId: _id });
  return res.status(200).json({ getCourseByUserId });
};

export const getPublicCategory = async (req: Request, res: Response) => {
  const getCat = await CourseCategory.find();
  if (!getCat) return res.status(404).json({ msg: "Cat not found" });
  return res.status(200).json({ getCat });
};

export const getPublicUser = async (req: Request, res: Response) => {
  try {
    const getUser = await User.find({}, { password: 0 });
    if (!getUser) {
      return res.status(404).json({ msg: "User not found." });
    }
    return res.status(200).json({ getUser });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export const getPublicEnrolls = async (req: Request, res: Response) => {
  try {
    const getEnrolls = await Enrollment.find();
    if (!getEnrolls) {
      return res.status(404).json({ msg: "User not found." });
    }
    return res.status(200).json({ getEnrolls });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export const getEnrollById = async (req: Request, res: Response) => {
  try {
    const userId = req.user;
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

export const getPublicUserById = async (req: Request, res: Response) => {
  try {
    const userId = req.user._id;
    console.log("req user: ", req.user);
    const getUserById = await User.findOne({ _id: userId });
    if (!getUserById) {
      return res.status(404).json({ msg: "User not found." });
    }
    return res.status(200).json({ getUserById });
  } catch (error) {
    return res.status(500).json({ error });
  }
};
