"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFilteredCourses = void 0;
const courseSchema_1 = require("../../model/courseSchema");
const getFilteredCourses = async (req, res) => {
    try {
        const { search, category } = req.query;
        const filters = [];
        if (search) {
            filters.push({ title: { $regex: search, $options: "i" } });
        }
        if (category) {
            filters.push({ categoryId: category });
        }
        const query = filters.length > 0 ? { $or: filters } : {};
        const courses = await courseSchema_1.Course.find(query).populate("categoryId");
        if (!courses || courses.length === 0) {
            return res.status(404).json({ message: "No courses found" });
        }
        res.status(200).json(courses);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
exports.getFilteredCourses = getFilteredCourses;
