import express from "express";
import {
  getPublicCategory,
  getPublicCourse,
  getPublicCourseById,
  getPublicLesson,
} from "../../controller/publicController/getPublicCourse.ts";

export const publicRoute = express.Router();

publicRoute.get("/category", getPublicCategory);
publicRoute.get("/course", getPublicCourse);
publicRoute.get("/course/:id", getPublicCourseById);
publicRoute.get("/lesson", getPublicLesson);
