"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCourseController = void 0;
const courseSchema_ts_1 = require("../../model/courseSchema.ts");
const deleteCourseController = async (req, res) => {
    const _id = req.params.id;
    const createdBy = req.user._id;
    const course = await courseSchema_ts_1.Course.findOne({ _id });
    if (!course) {
        return res.status(404).json({ msg: "Course not found." });
    }
    const getCourse = await courseSchema_ts_1.Course.deleteOne({ _id: _id, createdBy: createdBy });
    if (getCourse) {
        return res.status(200).json({ msg: "Course deleted!" });
    }
    return res.status(200).json({ msg: "doing good" });
};
exports.deleteCourseController = deleteCourseController;
