"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    fullname: {
        type: String,
        trim: true,
    },
    email: {
        type: String,
        trim: true,
        unique: true,
    },
    password: {
        type: String,
        minlenght: 6,
        trim: true,
    },
    phone: {
        type: String,
        trim: true,
    },
    progress: {
        type: String,
        trim: true,
    },
    role: {
        type: String,
        enum: ["admin", "teacher", "student"],
        default: "student",
        trim: true,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    profileImg: {
        type: String,
        trim: true,
    },
    bio: {
        type: String,
        trim: true,
    },
    country: {
        type: String,
        trim: true,
    },
    notification: {
        type: String,
        trim: true,
    },
}, { timestamps: true });
exports.User = mongoose_1.default.models.User || mongoose_1.default.model("User", userSchema);
