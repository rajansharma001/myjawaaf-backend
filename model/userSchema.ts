import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
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
  },
  { timestamps: true }
);

export const User = mongoose.models.User || mongoose.model("User", userSchema);
