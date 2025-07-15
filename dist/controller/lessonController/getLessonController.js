"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLessonByCourseIdController = exports.getLessonByIdController = exports.getLessonController = void 0;
const lessonSchema_ts_1 = require("../../model/lessonSchema.ts");
const courseSchema_ts_1 = require("../../model/courseSchema.ts");
const getLessonController = async (req, res) => {
    try {
        const _id = req.user._id;
        if (!_id) {
            return res.status(404).json({ msg: "User not found" });
        }
        const getCourse = await courseSchema_ts_1.Course.find({ createdBy: _id });
        const courseId = getCourse.map((course) => course._id);
        const getLesson = await lessonSchema_ts_1.Lesson.find({ courseId: { $in: courseId } });
        if (!getLesson) {
            return res.status(404).json({ msg: "lesson not found" });
        }
        return res.status(200).json({ msg: "Course fetched for user", getLesson });
    }
    catch (error) {
        return res.status(200).json({ msg: "Bad request. Course fetched", error });
    }
};
exports.getLessonController = getLessonController;
const getLessonByIdController = async (req, res) => {
    try {
        const lessonId = req.params.id;
        if (!lessonId) {
            return res.status(404).json({ msg: "lesson not found" });
        }
        const getLessonById = await lessonSchema_ts_1.Lesson.findOne({ _id: lessonId });
        if (!getLessonById) {
            return res.status(404).json({ msg: "lesson not found" });
        }
        return res.status(200).json({ msg: "Course fetched for user", getLessonById });
    }
    catch (error) {
        return res.status(200).json({ msg: "Bad request. Course fetched", error });
    }
};
exports.getLessonByIdController = getLessonByIdController;
const getLessonByCourseIdController = async (req, res) => {
    try {
        const courseId = req.params.id;
        if (!courseId) {
            return res.status(404).json({ msg: "Course not found" });
        }
        const getLessonByCourseId = await lessonSchema_ts_1.Lesson.find({ courseId: courseId });
        if (!getLessonByCourseId) {
            return res.status(404).json({ msg: "lesson not found" });
        }
        return res.status(200).json({ msg: "Course fetched for user", getLessonByCourseId });
    }
    catch (error) {
        return res.status(200).json({ msg: "Bad request. Course fetched", error });
    }
};
exports.getLessonByCourseIdController = getLessonByCourseIdController;
