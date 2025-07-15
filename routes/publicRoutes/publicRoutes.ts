import express from "express";
import {
  getEnrollById,
  getPublicCategory,
  getPublicCourse,
  getPublicCourseById,
  getPublicEnrolls,
  getPublicLesson,
  getPublicLessons,
  getPublicUser,
  getPublicUserById,
} from "../../controller/publicController/getPublicCourse";
import { verifyToken } from "../../middleware/verifyToken";
import { allowRole } from "../../middleware/allowRole";
import { getFilteredCourses } from "../../controller/publicController/getFilteredSearch";

export const publicRoute = express.Router();

publicRoute.get("/category", getPublicCategory);
publicRoute.get("/course", getPublicCourse);
publicRoute.get("/users", getPublicUser);
publicRoute.get("/course/:id", getPublicCourseById); //course by courseid
publicRoute.get("/userid", verifyToken, getPublicUserById);
publicRoute.get("/lessons", getPublicLessons);

publicRoute.get("/enrolls", getPublicEnrolls);

publicRoute.get("/lesson/:id", getPublicLesson);

publicRoute.get(
  "/enrollments",
  verifyToken,
  allowRole("admin", "student"),
  getEnrollById
);

publicRoute.get("/courses", getFilteredCourses);
