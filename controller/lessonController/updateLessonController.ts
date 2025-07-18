import type { Request, Response } from "express";
import { Course } from "../../model/courseSchema";
import { Lesson } from "../../model/lessonSchema";

export const updateLessonController = async (req: Request, res: Response) => {
  try {
    const { title, slug, duration, isPreview, description, courseId } =
      req.body;
    const lessonId = req.params.id;
    const userId = req.user._id;

    const file = req.file;
    const videoPath = file?.path || "";

    const updateLesson = {
      title,
      slug,
      videoUrl: videoPath,
      duration,
      isPreview,
      description,
    };
    const update = await Lesson.updateOne(
      { _id: lessonId, courseId: courseId },
      { $set: updateLesson }
    );
    console.log("give me some msg: ", update);
    if (!update) {
      console.log("updatation failed");
    }

    return res.status(200).json({ msg: "Course updated" });
  } catch (error) {
    console.log(error);
  }
};
