"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.lessonRoute = void 0;
const express_1 = __importDefault(require("express"));
const createLessonController_1 = require("../controller/lessonController/createLessonController");
const getLessonController_1 = require("../controller/lessonController/getLessonController");
const deleteLessonController_1 = require("../controller/lessonController/deleteLessonController");
const updateLessonController_1 = require("../controller/lessonController/updateLessonController");
const uploadMiddleware_1 = require("../middleware/uploads/uploadMiddleware");
exports.lessonRoute = express_1.default.Router();
exports.lessonRoute.post("/create-lesson", uploadMiddleware_1.upload.single("videoUrl"), createLessonController_1.createLessonController);
exports.lessonRoute.get("/get-lesson", getLessonController_1.getLessonController);
exports.lessonRoute.get("/get-lesson/:id", getLessonController_1.getLessonByIdController);
exports.lessonRoute.get("/get-course-lesson/:id", getLessonController_1.getLessonByCourseIdController);
exports.lessonRoute.delete("/delete-lesson/:id", deleteLessonController_1.deleteLessonController);
exports.lessonRoute.patch("/update-lesson/:id", uploadMiddleware_1.upload.single("videoUrl"), updateLessonController_1.updateLessonController);
