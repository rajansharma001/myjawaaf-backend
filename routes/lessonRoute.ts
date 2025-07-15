import express from "express";
import { createLessonController } from "../controller/lessonController/createLessonController";
import {
  getLessonController,
  getLessonByIdController,
  getLessonByCourseIdController,
} from "../controller/lessonController/getLessonController";
import { deleteLessonController } from "../controller/lessonController/deleteLessonController";
import { updateLessonController } from "../controller/lessonController/updateLessonController";
import { upload } from "../middleware/uploads/uploadMiddleware";

export const lessonRoute = express.Router();

lessonRoute.post(
  "/create-lesson",
  upload.single("videoUrl"),
  createLessonController
);
lessonRoute.get("/get-lesson", getLessonController);
lessonRoute.get("/get-lesson/:id", getLessonByIdController);
lessonRoute.get("/get-course-lesson/:id", getLessonByCourseIdController);
lessonRoute.delete("/delete-lesson/:id", deleteLessonController);
lessonRoute.patch(
  "/update-lesson/:id",
  upload.single("videoUrl"),
  updateLessonController
);
