import type { Request, Response } from "express";
import { Course } from "../../model/courseSchema.ts";
import { Lesson } from "../../model/lessonSchema.ts";

export const updateLessonController = async (req: Request, res: Response) => {
  const { title, slug, videoUrl, duration, isPreview, description } = req.body;
  const lessonId = req.params.id;
  const userId = req.user._id;
  const getCourse = await Course.findOne({ createdBy: userId });
  const updateLesson = {
    title,
    slug,
    videoUrl,
    duration,
    isPreview,
    description,
  };
  const update = await Lesson.updateOne(
    { _id: lessonId, courseId: getCourse._id },
    { $set: updateLesson }
  );
  if (update.modifiedCount === 0) {
    return res
      .status(403)
      .json({ msg: "Lesson update failed or nothing changed" });
  }

  return res.status(200).json({ msg: "Course updated" });
};
