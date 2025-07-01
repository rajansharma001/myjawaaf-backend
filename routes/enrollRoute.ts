import express from "express";
import { createEnrollmentController } from "../controller/enrollmentController/enrollmentController.ts";

export const enrollRoute = express.Router();

enrollRoute.post("/enroll-course/:id", createEnrollmentController);
