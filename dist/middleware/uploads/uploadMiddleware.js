"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const cloudinary_1 = require("cloudinary");
const multer_storage_cloudinary_1 = require("multer-storage-cloudinary");
const multer_1 = __importDefault(require("multer"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Cloudinary Config
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
// Multer Storage with Cloudinary
const storage = new multer_storage_cloudinary_1.CloudinaryStorage({
    cloudinary: cloudinary_1.v2,
    params: async (req, file) => {
        const isImage = file.mimetype.startsWith("image");
        return {
            folder: "myjawaaf_uploads",
            resource_type: "auto", // Automatically detect video or image
            allowed_formats: ["jpg", "png", "jpeg", "mp4"],
            ...(isImage && {
                transformation: [{ width: 500, height: 500, crop: "limit" }],
            }),
        };
    },
});
exports.upload = (0, multer_1.default)({ storage });
