"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.enrollRoute = void 0;
const express_1 = __importDefault(require("express"));
const enrollmentController_1 = require("../controller/enrollmentController/enrollmentController");
const uploadMiddleware_1 = require("../middleware/uploads/uploadMiddleware");
exports.enrollRoute = express_1.default.Router();
exports.enrollRoute.post("/enroll-course", uploadMiddleware_1.upload.single("receipt"), enrollmentController_1.createEnrollmentController);
exports.enrollRoute.get("/get-enrolled", enrollmentController_1.getEnrolledController);
exports.enrollRoute.get("/get-enrolled/:id", enrollmentController_1.getEnrolledByIdController);
exports.enrollRoute.patch("/update-enrolled/:id", uploadMiddleware_1.upload.single("receipt"), enrollmentController_1.updateEnrolledByIdController);
exports.enrollRoute.delete("/delete-enrolled/:id", enrollmentController_1.deleteEnrolledController);
