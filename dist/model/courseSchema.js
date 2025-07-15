"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Course = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const categorySchema_ts_1 = require("./categorySchema.ts");
const courseSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        trim: true,
        required: true,
    },
    slug: {
        type: String,
        trim: true,
        required: true,
    },
    description: {
        type: String,
        trim: true,
    },
    thumbnail: {
        type: String,
        trim: true,
        required: true,
    },
    categoryId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: categorySchema_ts_1.CourseCategory,
        required: true,
    },
    isFree: {
        type: Boolean,
        default: true,
    },
    price: {
        type: Number,
        trim: true,
    },
    discount: {
        type: Number,
        trim: true,
    },
    level: {
        type: String,
        trim: true,
    },
    language: {
        type: String,
        trim: true,
    },
    isPublished: {
        type: Boolean,
        default: false,
    },
    tags: {
        type: String,
        trim: true,
    },
    studentCount: {
        type: Number,
        trim: true,
    },
    createdBy: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
}, { timestamps: true });
exports.Course = mongoose_1.default.models.Course || mongoose_1.default.model("Course", courseSchema);
