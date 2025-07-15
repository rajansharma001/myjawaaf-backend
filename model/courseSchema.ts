import mongoose from "mongoose";
import { CourseCategory } from "./categorySchema";

const courseSchema = new mongoose.Schema(
  {
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
      type: mongoose.Schema.Types.ObjectId,
      ref: CourseCategory,
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
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export const Course =
  mongoose.models.Course || mongoose.model("Course", courseSchema);
