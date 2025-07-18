import type { Request, Response } from "express";
import { Course } from "../../model/courseSchema";
import { Lesson } from "../../model/lessonSchema";
export const deleteLessonController = async (req: Request, res: Response) => {
  try {
    const lessonId = req.params.id;
    const _id = req.user._id;
    if (!_id) {
      return res.status(404).json({ msg: "User not found" });
    }
    const getCourse = await Course.find({});
    const courseId = getCourse.map((course) => course._id);

    const deleteLesson = await Lesson.deleteOne({ _id: lessonId, courseId });
    return res.status(200).json({ msg: "lesson deleted." });
  } catch (error) {
    return res.status(500).json({ msg: "Bad request for lesson deletion." });
  }
};
