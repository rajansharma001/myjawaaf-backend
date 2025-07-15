import express from "express";
import {
  createEnrollmentController,
  deleteEnrolledController,
  getEnrolledByIdController,
  getEnrolledController,
  updateEnrolledByIdController,
} from "../controller/enrollmentController/enrollmentController";
import { upload } from "../middleware/uploads/uploadMiddleware";

export const enrollRoute = express.Router();

enrollRoute.post(
  "/enroll-course",
  upload.single("receipt"),
  createEnrollmentController
);

enrollRoute.get("/get-enrolled", getEnrolledController);
enrollRoute.get("/get-enrolled/:id", getEnrolledByIdController);
enrollRoute.patch(
  "/update-enrolled/:id",
  upload.single("receipt"),
  updateEnrolledByIdController
);

enrollRoute.delete("/delete-enrolled/:id", deleteEnrolledController);
