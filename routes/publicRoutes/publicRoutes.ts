import express from "express";
import {
  getEnrollById,
  getPublicCategory,
  getPublicCourse,
  getPublicCourseById,
  getPublicCourseByUserId,
  getPublicLesson,
  getPublicUser,
  getPublicUserById,
} from "../../controller/publicController/getPublicCourse.ts";
import { verifyToken } from "../../middleware/verifyToken.ts";
import { allowRole } from "../../middleware/allowRole.ts";

export const publicRoute = express.Router();

publicRoute.get("/category", getPublicCategory);
publicRoute.get("/course", getPublicCourse);
publicRoute.get("/users", getPublicUser);
publicRoute.get("/course/:id", getPublicCourseById); //course by courseid
publicRoute.get("/userid", verifyToken, getPublicUserById);

publicRoute.get("/lesson/:id", getPublicLesson);

publicRoute.get(
  "/enrollments",
  verifyToken,
  allowRole("admin", "student"),
  getEnrollById
);
