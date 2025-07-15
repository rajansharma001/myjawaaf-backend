"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Lesson = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const lessonSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        trim: true,
    },
    slug: {
        type: String,
        trim: true,
    },
    videoUrl: {
        type: String,
        trim: true,
    },
    duration: {
        type: String,
        trim: true,
    },
    isPreview: {
        type: Boolean,
        default: false,
    },
    description: {
        type: String,
        trim: true,
    },
    courseId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Course",
        required: true,
    },
}, { timestamps: true });
exports.Lesson = mongoose_1.default.models.Lesson || mongoose_1.default.model("Lesson", lessonSchema);
