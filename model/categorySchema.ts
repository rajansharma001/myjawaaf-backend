import mongoose from "mongoose";

const CourseCategorySchema = new mongoose.Schema(
  {
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
  },
  { timestamps: true }
);

export const CourseCategory =
  mongoose.models.CourseCategory ||
  mongoose.model("CourseCategory", CourseCategorySchema, "CourseCategory");
