"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseCategory = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const CourseCategorySchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    slug: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
    },
    description: {
        type: String,
        default: "",
    },
}, { timestamps: true });
exports.CourseCategory = mongoose_1.default.models.CourseCategory ||
    mongoose_1.default.model("CourseCategory", CourseCategorySchema, "CourseCategory");
