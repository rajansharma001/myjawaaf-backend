"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCourseController = void 0;
const courseSchema_ts_1 = require("../../model/courseSchema.ts");
const path_1 = __importDefault(require("path"));
const createCourseController = async (req, res) => {
    try {
        const { title, slug, description, categoryId, isFree, price, discount, level, language, isPublished, } = req.body;
        const file = req.file;
        console.log("is file receiving: ", req.file);
        const thumbnailPath = file ? path_1.default.posix.join("uploads", file.filename) : "";
        const currentUser = req.user;
        console.log("current user: ", currentUser);
        if (currentUser.role === "admin" || currentUser.role === "teacher") {
            const newCourse = {
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
                createdBy: currentUser._id,
            };
            const course = await courseSchema_ts_1.Course.create(newCourse);
            return res.status(201).json({ msg: "Course Created Success!", course });
        }
        else {
            return res
                .status(405)
                .json({ msg: "You are not allowed to manage this task." });
        }
    }
    catch (error) {
        return res
            .status(500)
            .json({ msg: "Bad Request while creating a new course!" });
    }
};
exports.createCourseController = createCourseController;
