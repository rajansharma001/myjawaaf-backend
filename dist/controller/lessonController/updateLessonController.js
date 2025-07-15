"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateLessonController = void 0;
const lessonSchema_ts_1 = require("../../model/lessonSchema.ts");
const updateLessonController = async (req, res) => {
    try {
        const { title, slug, duration, isPreview, description, courseId } = req.body;
        const lessonId = req.params.id;
        const userId = req.user._id;
        const videoPath = req.file?.filename;
        const updateLesson = {
            title,
            slug,
            videoUrl: videoPath,
            duration,
            isPreview,
            description,
        };
        const update = await lessonSchema_ts_1.Lesson.updateOne({ _id: lessonId, courseId: courseId }, { $set: updateLesson });
        console.log("give me some msg: ", update);
        if (!update) {
            console.log("updatation failed");
        }
        return res.status(200).json({ msg: "Course updated" });
    }
    catch (error) {
        console.log(error);
    }
};
exports.updateLessonController = updateLessonController;
