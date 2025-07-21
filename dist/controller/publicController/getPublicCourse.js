"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPublicUserById = exports.getEnrollById = exports.getPublicEnrolls = exports.getPublicUser = exports.getPublicCategory = exports.getPublicCourseByUserId = exports.getPublicCourseById = exports.getPublicLessons = exports.getPublicLesson = exports.getPublicCourse = void 0;
const courseSchema_1 = require("../../model/courseSchema");
const lessonSchema_1 = require("../../model/lessonSchema");
const categorySchema_1 = require("../../model/categorySchema");
const userSchema_1 = require("../../model/userSchema");
const enrollSchema_1 = require("../../model/enrollSchema");
const getPublicCourse = async (req, res) => {
    const getCourse = await courseSchema_1.Course.find({ isPublished: true });
    return res.status(200).json({ getCourse });
};
exports.getPublicCourse = getPublicCourse;
// lesson by id
const getPublicLesson = async (req, res) => {
    const id = req.params.id;
    console.log(id);
    const getLesson = await lessonSchema_1.Lesson.find({ courseId: id });
    if (!getLesson)
        return res.status(404).json({ msg: "Lesson not found" });
    console.log(getLesson);
    return res.status(200).json({ getLesson });
};
exports.getPublicLesson = getPublicLesson;
// all lesson
const getPublicLessons = async (req, res) => {
    const getLessons = await lessonSchema_1.Lesson.find();
    if (!getLessons)
        return res.status(404).json({ msg: "Lessons not found" });
    console.log(getLessons);
    return res.status(200).json({ getLessons });
};
exports.getPublicLessons = getPublicLessons;
// fetch course by courseId
const getPublicCourseById = async (req, res) => {
    const _id = req.params.id;
    if (!_id)
        return res.status(404).json({ msg: "Params ID not found" });
    const getCourseById = await courseSchema_1.Course.findOne({ _id });
    return res.status(200).json({ getCourseById });
};
exports.getPublicCourseById = getPublicCourseById;
// fetchcourse by user id
const getPublicCourseByUserId = async (req, res) => {
    const _id = req.user._id;
    if (!_id)
        return res.status(404).json({ msg: "User ID not found" });
    const getCourseByUserId = await courseSchema_1.Course.find({ userId: _id });
    return res.status(200).json({ getCourseByUserId });
};
exports.getPublicCourseByUserId = getPublicCourseByUserId;
const getPublicCategory = async (req, res) => {
    const getCat = await categorySchema_1.CourseCategory.find();
    if (!getCat)
        return res.status(404).json({ msg: "Cat not found" });
    return res.status(200).json({ getCat });
};
exports.getPublicCategory = getPublicCategory;
const getPublicUser = async (req, res) => {
    try {
        const getUser = await userSchema_1.User.find({}, { password: 0 });
        if (!getUser) {
            return res.status(404).json({ msg: "User not found." });
        }
        return res.status(200).json({ getUser });
    }
    catch (error) {
        return res.status(500).json({ error });
    }
};
exports.getPublicUser = getPublicUser;
const getPublicEnrolls = async (req, res) => {
    try {
        const getEnrolls = await enrollSchema_1.Enrollment.find();
        if (!getEnrolls) {
            return res.status(404).json({ msg: "User not found." });
        }
        return res.status(200).json({ getEnrolls });
    }
    catch (error) {
        return res.status(500).json({ error });
    }
};
exports.getPublicEnrolls = getPublicEnrolls;
const getEnrollById = async (req, res) => {
    try {
        const userId = req.user;
        console.log(userId);
        const getEnrollById = await enrollSchema_1.Enrollment.find({ userId });
        if (!getEnrollById) {
            return res.status(404).json({ msg: "Enrollments not found" });
        }
        return res.status(200).json({ getEnrollById });
    }
    catch (error) {
        return res.status(500).json({ msg: "Bad Request for enroll fetch" });
    }
};
exports.getEnrollById = getEnrollById;
const getPublicUserById = async (req, res) => {
    try {
        const userId = req.user._id;
        console.log("req user: ", req.user);
        const getUserById = await userSchema_1.User.findOne({ _id: userId });
        if (!getUserById) {
            return res.status(404).json({ msg: "User not found." });
        }
        return res.status(200).json({ getUserById });
    }
    catch (error) {
        return res.status(500).json({ error });
    }
};
exports.getPublicUserById = getPublicUserById;
