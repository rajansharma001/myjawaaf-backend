import mongoose from "mongoose";

const enrollmentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
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
  },
  { timestamps: true }
);

export const Enrollment =
  mongoose.models.Enrollment || mongoose.model("Enrollment", enrollmentSchema);
