"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCourseController = void 0;
const courseSchema_1 = require("../../model/courseSchema");
const createCourseController = async (req, res) => {
    console.log("req body not getting in backend: ", req.body);
    try {
        const { title, slug, description, categoryId, isFree, price, discount, level, language, isPublished, } = req.body;
        const file = req.file;
        const thumbnailPath = file?.path || "";
        const currentUser = req.user;
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
            console.log("thumbnail req file: ", req.file);
            console.log("course from frontend: ", newCourse);
            const course = await courseSchema_1.Course.create(newCourse);
            console.log("course created: ", course);
            return res.status(201).json({ msg: "Course Created Success!", course });
        }
        else {
            return res
                .status(405)
                .json({ msg: "You are not allowed to manage this task." });
        }
    }
    catch (error) {
        console.error("Error in createCourseController:", error); // <== add this line
        return res.status(500).json({
            msg: "Bad Request while creating a new course!",
            error: error instanceof Error ? error.message : error,
        });
    }
};
exports.createCourseController = createCourseController;
