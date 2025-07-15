"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Enrollment = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const enrollmentSchema = new mongoose_1.default.Schema({
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    courseId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Course",
        required: true,
    },
    isFree: {
        type: Boolean,
        default: false,
    },
    amountPaid: {
        type: Number,
        default: 0,
    },
    receipt: {
        type: String,
        trim: true,
    },
    paymentId: {
        type: String,
        default: null,
    },
    hasAccess: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });
exports.Enrollment = mongoose_1.default.models.Enrollment || mongoose_1.default.model("Enrollment", enrollmentSchema);
