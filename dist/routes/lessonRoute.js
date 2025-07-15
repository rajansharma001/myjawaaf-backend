"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.lessonRoute = void 0;
const express_1 = __importDefault(require("express"));
const createLessonController_ts_1 = require("../controller/lessonController/createLessonController.ts");
const getLessonController_ts_1 = require("../controller/lessonController/getLessonController.ts");
const deleteLessonController_ts_1 = require("../controller/lessonController/deleteLessonController.ts");
const updateLessonController_ts_1 = require("../controller/lessonController/updateLessonController.ts");
const uploadMiddleware_ts_1 = require("../middleware/uploads/uploadMiddleware.ts");
exports.lessonRoute = express_1.default.Router();
exports.lessonRoute.post("/create-lesson", uploadMiddleware_ts_1.upload.single("videoUrl"), createLessonController_ts_1.createLessonController);
exports.lessonRoute.get("/get-lesson", getLessonController_ts_1.getLessonController);
exports.lessonRoute.get("/get-lesson/:id", getLessonController_ts_1.getLessonByIdController);
exports.lessonRoute.get("/get-course-lesson/:id", getLessonController_ts_1.getLessonByCourseIdController);
exports.lessonRoute.delete("/delete-lesson/:id", deleteLessonController_ts_1.deleteLessonController);
exports.lessonRoute.patch("/update-lesson/:id", uploadMiddleware_ts_1.upload.single("videoUrl"), updateLessonController_ts_1.updateLessonController);
