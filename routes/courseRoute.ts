import express from "express";
import { courseInputValidation } from "../middleware/courseValidation/courseInputValidation";
import { createCourseController } from "../controller/courseController/createCourseController";
import { deleteCourseController } from "../controller/courseController/deleteCourseController";
import { updateCourseController } from "../controller/courseController/updateCourseController";
import {
  getCourseController,
  getCourseByIdController,
} from "../controller/courseController/getCourseController";
import { upload } from "../middleware/uploads/uploadMiddleware";
export const courseRoute = express.Router();

courseRoute.post(
  "/create-course",
  upload.single("thumbnail"),
  courseInputValidation,
  createCourseController
);
courseRoute.get("/get-course/", getCourseController);
courseRoute.get("/get-course/:id", getCourseByIdController);
courseRoute.patch(
  "/update-course/:id",
  upload.single("thumbnail"),
  updateCourseController
);
courseRoute.delete("/delete-course/:id", deleteCourseController);
