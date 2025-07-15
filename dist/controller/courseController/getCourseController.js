"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCourseByIdController = exports.getCourseController = void 0;
const courseSchema_ts_1 = require("../../model/courseSchema.ts");
const getCourseController = async (req, res) => {
    try {
        const userId = req.user._id;
        if (!userId) {
            return res.status(404).json({ msg: "User not found." });
        }
        const getCourse = await courseSchema_ts_1.Course.find({ createdBy: userId });
        return res.status(200).json({ msg: " Course fetched success.", getCourse });
    }
    catch (error) {
        return res.status(500).json({ msg: "Bad request for course fetch" });
    }
};
exports.getCourseController = getCourseController;
const getCourseByIdController = async (req, res) => {
    try {
        const courseId = req.params.id;
        if (!courseId) {
            return res.status(404).json({ msg: "Course not found." });
        }
        const getCourseById = await courseSchema_ts_1.Course.findOne({ _id: courseId });
        return res.status(200).json({ getCourseById });
    }
    catch (error) {
        return res.status(500).json({ msg: "Bad request for course fetch" });
    }
};
exports.getCourseByIdController = getCourseByIdController;
