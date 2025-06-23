import express from "express";
import { courseInputValidation } from "../middleware/courseValidation/courseInputValidation.ts";
import { createCourseController } from "../controller/courseController/createCourseController.ts";
import { deleteCourseController } from "../controller/courseController/deleteCourseController.ts";
import { updateCourseController } from "../controller/courseController/updateCourseController.ts";
import { getCourseController } from "../controller/courseController/getCourseController.ts";
export const courseRoute = express.Router();

courseRoute.post(
  "/create-course",
  courseInputValidation,
  createCourseController
);
courseRoute.get("/get-course/", getCourseController);
courseRoute.patch("/update-course/:_id", updateCourseController);
courseRoute.delete("/delete-course/:_id", deleteCourseController);
