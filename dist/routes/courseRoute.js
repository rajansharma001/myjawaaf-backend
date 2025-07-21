"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.courseRoute = void 0;
const express_1 = __importDefault(require("express"));
const courseInputValidation_1 = require("../middleware/courseValidation/courseInputValidation");
const createCourseController_1 = require("../controller/courseController/createCourseController");
const deleteCourseController_1 = require("../controller/courseController/deleteCourseController");
const updateCourseController_1 = require("../controller/courseController/updateCourseController");
const getCourseController_1 = require("../controller/courseController/getCourseController");
const uploadMiddleware_1 = require("../middleware/uploads/uploadMiddleware");
exports.courseRoute = express_1.default.Router();
exports.courseRoute.post("/create-course", uploadMiddleware_1.upload.single("thumbnail"), courseInputValidation_1.courseInputValidation, createCourseController_1.createCourseController);
exports.courseRoute.get("/get-course/", getCourseController_1.getCourseController);
exports.courseRoute.get("/get-course/:id", getCourseController_1.getCourseByIdController);
exports.courseRoute.patch("/update-course/:id", uploadMiddleware_1.upload.single("thumbnail"), updateCourseController_1.updateCourseController);
exports.courseRoute.delete("/delete-course/:id", deleteCourseController_1.deleteCourseController);
