"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createLessonController = void 0;
const lessonSchema_ts_1 = require("../../model/lessonSchema.ts");
const courseSchema_ts_1 = require("../../model/courseSchema.ts");
const createLessonController = async (req, res) => {
    try {
        const { title, slug, duration, isPreview, description, courseId } = req.body;
        const videoPath = req.file?.filename;
        if (!title || !slug || !duration || !description || !courseId) {
            return res.status(404).json({ msg: "Please fill all required fields" });
        }
        const fetchCourse = await courseSchema_ts_1.Course.findOne({ _id: courseId });
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
        const createLesson = await lessonSchema_ts_1.Lesson.create(newLesson);
        return res.status(200).json({ msg: "lesson created." });
    }
    catch (error) {
        return res
            .status(200)
            .json({ msg: "Bad request for lesson create", error });
    }
};
exports.createLessonController = createLessonController;
