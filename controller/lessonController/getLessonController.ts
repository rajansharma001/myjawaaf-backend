import type { Request, Response } from "express";
import { Lesson } from "../../model/lessonSchema.ts";
import { Course } from "../../model/courseSchema.ts";

export const getLessonController = async (req: Request, res: Response) => {
  try {
    const _id = req.user._id;
    if (!_id) {
      return res.status(404).json({ msg: "User not found" });
    }

    const getCourse = await Course.find({ createdBy: _id });
    const courseId = getCourse.map((course) => course._id);

    const getLesson = await Lesson.find({ courseId: { $in: courseId } });
    if (!getLesson) {
      return res.status(404).json({ msg: "lesson not found" });
    }
    return res.status(200).json({ msg: "Course fetched for user", getLesson });
  } catch (error) {
    return res.status(200).json({ msg: "Bad request. Course fetched", error });
  }
};


export const getLessonByIdController = async (req: Request, res: Response) => {
  try {
    const lessonId = req.params.id;
    if (!lessonId) {
      return res.status(404).json({ msg: "lesson not found" });
    }

    const getLessonById = await Lesson.findOne({ _id:lessonId });
    if (!getLessonById) {
      return res.status(404).json({ msg: "lesson not found" });
    }
    return res.status(200).json({ msg: "Course fetched for user", getLessonById });
  } catch (error) {
    return res.status(200).json({ msg: "Bad request. Course fetched", error });
  }
};



export const getLessonByCourseIdController = async (req: Request, res: Response) => {
  try {
    const courseId = req.params.id;
    if (!courseId) {
      return res.status(404).json({ msg: "Course not found" });
    }

    const getLessonByCourseId = await Lesson.find({ courseId:courseId });
    if (!getLessonByCourseId) {
      return res.status(404).json({ msg: "lesson not found" });
    }
    return res.status(200).json({ msg: "Course fetched for user", getLessonByCourseId });
  } catch (error) {
    return res.status(200).json({ msg: "Bad request. Course fetched", error });
  }
};