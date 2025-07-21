"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteLessonController = void 0;
const courseSchema_1 = require("../../model/courseSchema");
const lessonSchema_1 = require("../../model/lessonSchema");
const deleteLessonController = async (req, res) => {
    try {
        const lessonId = req.params.id;
        const _id = req.user._id;
        if (!_id) {
            return res.status(404).json({ msg: "User not found" });
        }
        const getCourse = await courseSchema_1.Course.find({});
        const courseId = getCourse.map((course) => course._id);
        const deleteLesson = await lessonSchema_1.Lesson.deleteOne({ _id: lessonId, courseId });
        return res.status(200).json({ msg: "lesson deleted." });
    }
    catch (error) {
        return res.status(500).json({ msg: "Bad request for lesson deletion." });
    }
};
exports.deleteLessonController = deleteLessonController;
