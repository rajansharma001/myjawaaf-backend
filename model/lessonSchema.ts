import mongoose from "mongoose";
import { ref } from "process";

const lessonSchema = new mongoose.Schema(
  {
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
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
  },
  { timestamps: true }
);

export const Lesson =
  mongoose.models.Lesson || mongoose.model("Lesson", lessonSchema);
