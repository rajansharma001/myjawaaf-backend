"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateEnrolledByIdController = exports.getEnrolledByIdController = exports.deleteEnrolledController = exports.getEnrolledController = exports.createEnrollmentController = void 0;
const courseSchema_ts_1 = require("../../model/courseSchema.ts");
const enrollSchema_ts_1 = require("../../model/enrollSchema.ts");
const userSchema_ts_1 = require("../../model/userSchema.ts");
const path_1 = __importDefault(require("path"));
const createEnrollmentController = async (req, res) => {
    console.log(req.body);
    try {
        const { courseId, userId } = req.body;
        const getCourse = await courseSchema_ts_1.Course.findOne({ _id: courseId });
        if (!getCourse) {
            return res.status(404).json({ msg: "Coruse not found" });
        }
        const getUser = await userSchema_ts_1.User.findOne({ _id: userId });
        if (!getUser) {
            return res.status(404).json({ msg: "User not found" });
        }
        const file = req.file;
        const uploadedReceipt = file
            ? path_1.default.posix.join("uploads", file.filename)
            : "";
        if (!file) {
            return res.status(404).json({ msg: "Please upload a receipt" });
        }
        const getEnrollments = await enrollSchema_ts_1.Enrollment.findOne({ userId, courseId });
        if (getEnrollments) {
            return res
                .status(403)
                .json({ msg: "you already enrolled in this course." });
        }
        const generatePaymentId = Math.floor(Math.random() * Date.now());
        const newEnrollment = {
            userId: userId,
            courseId: getCourse._id,
            isFree: getCourse.isFree,
            amountPaid: getCourse.price,
            receipt: uploadedReceipt,
            hasAccess: false,
            paymentId: generatePaymentId,
        };
        await enrollSchema_ts_1.Enrollment.create(newEnrollment);
        await courseSchema_ts_1.Course.updateOne({ _id: courseId }, { $inc: { studentCount: 1 } });
        return res.status(200).json({ msg: "Enrollment created." });
    }
    catch (error) {
        return res.status(500).json({ msg: "Bad request for Enrollment." });
    }
};
exports.createEnrollmentController = createEnrollmentController;
const getEnrolledController = async (req, res) => {
    try {
        const getEnrolled = await enrollSchema_ts_1.Enrollment.find();
        if (!getEnrolled) {
            return res.status(404).json({ msg: "Enrollments not found" });
        }
        return res.status(200).json({ getEnrolled });
    }
    catch (error) {
        console.log(error);
        return res
            .status(500)
            .json({ msg: "Bad request for ferching enrollments." });
    }
};
exports.getEnrolledController = getEnrolledController;
const deleteEnrolledController = async (req, res) => {
    try {
        const _id = req.params.id;
        const getEnrolled = await enrollSchema_ts_1.Enrollment.findOne({ _id });
        console.log("enroll coming: ", getEnrolled);
        if (!getEnrolled) {
            return res.status(404).json({ msg: "Enrollment not found" });
        }
        const getCourse = await courseSchema_ts_1.Course.findOne({ _id: getEnrolled.courseId });
        console.log("course coming: ", getCourse);
        const deleteEnroll = await enrollSchema_ts_1.Enrollment.deleteOne({
            _id,
            courseId: getCourse._id,
        });
        await courseSchema_ts_1.Course.updateOne({ _id: getCourse._id }, { $inc: { studentCount: -1 } });
        return res.status(200).json({ msg: "Enroll deleted" });
    }
    catch (error) {
        console.log(error);
        return res
            .status(500)
            .json({ msg: "Bad request for deleting enrollments." });
    }
};
exports.deleteEnrolledController = deleteEnrolledController;
const getEnrolledByIdController = async (req, res) => {
    try {
        const _id = req.params.id;
        const getEnrolled = await enrollSchema_ts_1.Enrollment.findOne({ _id });
        if (!getEnrolled) {
            return res.status(404).json({ msg: "Enrollment not found" });
        }
        return res.status(200).json({ getEnrolled });
    }
    catch (error) {
        console.log(error);
        return res
            .status(500)
            .json({ msg: "Bad request for ferching enrollments." });
    }
};
exports.getEnrolledByIdController = getEnrolledByIdController;
const updateEnrolledByIdController = async (req, res) => {
    const _id = req.params.id;
    console.log(req.body);
    const { userId, courseId, price, isFree, hasAccess } = req.body;
    const file = req.file;
    const filePath = file ? path_1.default.posix.join("uploads", file.filename) : "";
    const getEnroll = await enrollSchema_ts_1.Enrollment.findOne({ _id });
    if (!getEnroll) {
        return res.status(404).json({ msg: "Enrollment not found" });
    }
    const getCourse = await courseSchema_ts_1.Course.findOne({ _id: courseId });
    if (!getCourse) {
        return res.status(404).json({ msg: "Coruse not found" });
    }
    const getUser = await userSchema_ts_1.User.findOne({ _id: userId });
    if (!getUser) {
        return res.status(404).json({ msg: "User not found" });
    }
    const updateEnroll = await enrollSchema_ts_1.Enrollment.updateOne({ _id }, {
        userId: userId,
        courseId: getCourse._id,
        isFree: getCourse.isFree,
        amountPaid: getCourse.price,
        receipt: filePath || getEnroll.receipt,
        hasAccess: hasAccess,
        paymentId: getEnroll.paymentId,
    });
    if (!updateEnroll) {
        return res.status(403).json({ msg: "Update failed." });
    }
    return res.status(200).json({ msg: "Enrollment updated." });
};
exports.updateEnrolledByIdController = updateEnrolledByIdController;
