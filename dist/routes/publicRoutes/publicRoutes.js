"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.publicRoute = void 0;
const express_1 = __importDefault(require("express"));
const getPublicCourse_1 = require("../../controller/publicController/getPublicCourse");
const verifyToken_1 = require("../../middleware/verifyToken");
const allowRole_1 = require("../../middleware/allowRole");
const getFilteredSearch_1 = require("../../controller/publicController/getFilteredSearch");
exports.publicRoute = express_1.default.Router();
exports.publicRoute.get("/category", getPublicCourse_1.getPublicCategory);
exports.publicRoute.get("/course", getPublicCourse_1.getPublicCourse);
exports.publicRoute.get("/users", getPublicCourse_1.getPublicUser);
exports.publicRoute.get("/course/:id", getPublicCourse_1.getPublicCourseById); //course by courseid
exports.publicRoute.get("/userid", verifyToken_1.verifyToken, getPublicCourse_1.getPublicUserById);
exports.publicRoute.get("/lessons", getPublicCourse_1.getPublicLessons);
exports.publicRoute.get("/enrolls", getPublicCourse_1.getPublicEnrolls);
exports.publicRoute.get("/lesson/:id", getPublicCourse_1.getPublicLesson);
exports.publicRoute.get("/enrollments", verifyToken_1.verifyToken, (0, allowRole_1.allowRole)("admin", "student"), getPublicCourse_1.getEnrollById);
exports.publicRoute.get("/courses", getFilteredSearch_1.getFilteredCourses);
