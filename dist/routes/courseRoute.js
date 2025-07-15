"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.courseRoute = void 0;
const express_1 = __importDefault(require("express"));
const courseInputValidation_ts_1 = require("../middleware/courseValidation/courseInputValidation.ts");
const createCourseController_ts_1 = require("../controller/courseController/createCourseController.ts");
const deleteCourseController_ts_1 = require("../controller/courseController/deleteCourseController.ts");
const updateCourseController_ts_1 = require("../controller/courseController/updateCourseController.ts");
const getCourseController_ts_1 = require("../controller/courseController/getCourseController.ts");
const uploadMiddleware_ts_1 = require("../middleware/uploads/uploadMiddleware.ts");
exports.courseRoute = express_1.default.Router();
exports.courseRoute.post("/create-course", uploadMiddleware_ts_1.upload.single("thumbnail"), courseInputValidation_ts_1.courseInputValidation, createCourseController_ts_1.createCourseController);
exports.courseRoute.get("/get-course/", getCourseController_ts_1.getCourseController);
exports.courseRoute.get("/get-course/:id", getCourseController_ts_1.getCourseByIdController);
exports.courseRoute.patch("/update-course/:id", uploadMiddleware_ts_1.upload.single("thumbnail"), updateCourseController_ts_1.updateCourseController);
exports.courseRoute.delete("/delete-course/:id", deleteCourseController_ts_1.deleteCourseController);
