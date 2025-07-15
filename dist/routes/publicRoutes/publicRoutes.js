"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.publicRoute = void 0;
const express_1 = __importDefault(require("express"));
const getPublicCourse_ts_1 = require("../../controller/publicController/getPublicCourse.ts");
const verifyToken_ts_1 = require("../../middleware/verifyToken.ts");
const allowRole_ts_1 = require("../../middleware/allowRole.ts");
const getFilteredSearch_ts_1 = require("../../controller/publicController/getFilteredSearch.ts");
exports.publicRoute = express_1.default.Router();
exports.publicRoute.get("/category", getPublicCourse_ts_1.getPublicCategory);
exports.publicRoute.get("/course", getPublicCourse_ts_1.getPublicCourse);
exports.publicRoute.get("/users", getPublicCourse_ts_1.getPublicUser);
exports.publicRoute.get("/course/:id", getPublicCourse_ts_1.getPublicCourseById); //course by courseid
exports.publicRoute.get("/userid", verifyToken_ts_1.verifyToken, getPublicCourse_ts_1.getPublicUserById);
exports.publicRoute.get("/lessons", getPublicCourse_ts_1.getPublicLessons);
exports.publicRoute.get("/enrolls", getPublicCourse_ts_1.getPublicEnrolls);
exports.publicRoute.get("/lesson/:id", getPublicCourse_ts_1.getPublicLesson);
exports.publicRoute.get("/enrollments", verifyToken_ts_1.verifyToken, (0, allowRole_ts_1.allowRole)("admin", "student"), getPublicCourse_ts_1.getEnrollById);
exports.publicRoute.get("/courses", getFilteredSearch_ts_1.getFilteredCourses);
