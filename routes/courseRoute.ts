import express from "express";
import { courseInputValidation } from "../middleware/courseValidation/courseInputValidation.ts";
import { createCourseController } from "../controller/courseController/createCourseController.ts";
import { deleteCourseController } from "../controller/courseController/deleteCourseController.ts";
import { updateCourseController } from "../controller/courseController/updateCourseController.ts";
import {
  getCourseController,
  getCourseByIdController,
} from "../controller/courseController/getCourseController.ts";
import { upload } from "../middleware/uploads/uploadMiddleware.ts";
export const courseRoute = express.Router();

courseRoute.post(
  "/create-course",
  upload.single("thumbnail"),
  courseInputValidation,
  createCourseController
);
courseRoute.get("/get-course/", getCourseController);
courseRoute.get("/get-course/:id", getCourseByIdController);
courseRoute.patch("/update-course/:id", updateCourseController);
courseRoute.delete("/delete-course/:id", deleteCourseController);
