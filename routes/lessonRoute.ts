import express from "express";
import { createLessonController } from "../controller/lessonController/createLessonController.ts";
import { getLessonController } from "../controller/lessonController/getLessonController.ts";
import { deleteLessonController } from "../controller/lessonController/deleteLessonController.ts";
import { updateLessonController } from "../controller/lessonController/updateLessonController.ts";

export const lessonRoute = express.Router();

lessonRoute.post("/create-lesson", createLessonController);
lessonRoute.get("/get-lesson", getLessonController);
lessonRoute.delete("/delete-lesson/:id", deleteLessonController);
lessonRoute.patch("/update-lesson/:id", updateLessonController);
