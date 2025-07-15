"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCourseController = void 0;
const courseSchema_ts_1 = require("../../model/courseSchema.ts");
const path_1 = __importDefault(require("path"));
const updateCourseController = async (req, res) => {
    try {
        const courseId = req.params.id;
        console.log("courseId: ", courseId);
        const checkCourse = await courseSchema_ts_1.Course.findOne({ _id: courseId });
        if (!checkCourse) {
            return res.status(404).json({ msg: "Course not found." });
        }
        const { title, slug, description, categoryId, isFree, price, discount, level, language, isPublished, } = req.body;
        const user = req.user;
        const file = req.file;
        console.log("is file receiving: ", req.file);
        const thumbnailPath = file ? path_1.default.posix.join("uploads", file.filename) : "";
        await courseSchema_ts_1.Course.updateOne({ _id: courseId, createdBy: user._id }, {
            title,
            slug,
            description,
            thumbnail: thumbnailPath,
            categoryId,
            isFree,
            price,
            discount,
            level,
            language,
            isPublished,
        });
        return res.status(200).json({ msg: "Course updated success" });
    }
    catch (error) {
        return res.status(500).json({ msg: "Bad Request while Course updated" });
    }
};
exports.updateCourseController = updateCourseController;
