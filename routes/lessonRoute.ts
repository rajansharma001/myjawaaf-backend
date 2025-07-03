import express from "express";
import { createLessonController } from "../controller/lessonController/createLessonController.ts";
import { getLessonController,getLessonByIdController , getLessonByCourseIdController} from "../controller/lessonController/getLessonController.ts";
import { deleteLessonController } from "../controller/lessonController/deleteLessonController.ts";
import { updateLessonController } from "../controller/lessonController/updateLessonController.ts";
import { upload } from "../middleware/uploads/uploadMiddleware.ts";

export const lessonRoute = express.Router();

lessonRoute.post("/create-lesson", upload.single("videoUrl"), createLessonController);
lessonRoute.get("/get-lesson", getLessonController);
lessonRoute.get("/get-lesson/:id", getLessonByIdController);
lessonRoute.get("/get-course-lesson/:id", getLessonByCourseIdController);
lessonRoute.delete("/delete-lesson/:id", deleteLessonController);
lessonRoute.patch("/update-lesson/:id", updateLessonController);
