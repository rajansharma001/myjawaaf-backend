import type { Request, Response } from "express";
import { Lesson } from "../../model/lessonSchema";
import { Course } from "../../model/courseSchema";
export const createLessonController = async (req: Request, res: Response) => {
  try {
    const { title, slug, duration, isPreview, description, courseId } =
      req.body;

    const file = req.file;

    const videoPath = file?.path || "";

    if (!title || !slug || !duration || !description || !courseId) {
      return res.status(404).json({ msg: "Please fill all required fields" });
    }
    const fetchCourse = await Course.findOne({ _id: courseId });
    const newLesson = {
      title,
      slug,
      videoUrl: videoPath,
      duration,
      isPreview,
      description,
      courseId: fetchCourse._id,
    };

    console.log("new Lesson: ", newLesson);
    const createLesson = await Lesson.create(newLesson);
    console.log(createLesson);
    return res.status(200).json({ msg: "lesson created." });
  } catch (error) {
    return res
      .status(200)
      .json({ msg: "Bad request for lesson create", error });
  }
};
