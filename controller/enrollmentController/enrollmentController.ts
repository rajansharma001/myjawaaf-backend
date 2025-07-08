import type { Request, Response } from "express";
import { Course } from "../../model/courseSchema.ts";
import { Enrollment } from "../../model/enrollSchema.ts";
import { User } from "../../model/userSchema.ts";
import path from "path";

export const createEnrollmentController = async (
  req: Request,
  res: Response
) => {
  console.log(req.body);
  try {
    const { courseId, userId } = req.body;

    const getCourse = await Course.findOne({ _id: courseId });
    if (!getCourse) {
      return res.status(404).json({ msg: "Coruse not found" });
    }
    const getUser = await User.findOne({ _id: userId });
    if (!getUser) {
      return res.status(404).json({ msg: "User not found" });
    }

    const file = req.file;
    const uploadedReceipt = file
      ? path.posix.join("uploads", file.filename)
      : "";

    if (!file) {
      return res.status(404).json({ msg: "Please upload a receipt" });
    }

    const getEnrollments = await Enrollment.findOne({ userId, courseId });
    if (getEnrollments) {
      return res
        .status(403)
        .json({ msg: "you already enrolled in this course." });
    }

    const generatePaymentId = Math.floor(Math.random() * Date.now());
    const newEnrollment = {
      userId: userId,
      courseId: getCourse._id,
      isFree: getCourse.isFree,
      amountPaid: getCourse.price,
      receipt: uploadedReceipt,
      hasAccess: false,
      paymentId: generatePaymentId,
    };

    await Enrollment.create(newEnrollment);
    await Course.updateOne({ _id: courseId }, { $inc: { studentCount: 1 } });
    return res.status(200).json({ msg: "Enrollment created." });
  } catch (error) {
    return res.status(500).json({ msg: "Bad request for Enrollment." });
  }
};

export const getEnrolledController = async (req: Request, res: Response) => {
  try {
    const getEnrolled = await Enrollment.find();
    if (!getEnrolled) {
      return res.status(404).json({ msg: "Enrollments not found" });
    }
    return res.status(200).json({ getEnrolled });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ msg: "Bad request for ferching enrollments." });
  }
};

export const deleteEnrolledController = async (req: Request, res: Response) => {
  try {
    const _id = req.params.id;
    const getEnrolled = await Enrollment.findOne({ _id });

    console.log("enroll coming: ", getEnrolled);

    if (!getEnrolled) {
      return res.status(404).json({ msg: "Enrollment not found" });
    }

    const getCourse = await Course.findOne({ _id: getEnrolled.courseId });
    console.log("course coming: ", getCourse);

    const deleteEnroll = await Enrollment.deleteOne({
      _id,
      courseId: getCourse._id,
    });
    await Course.updateOne(
      { _id: getCourse._id },
      { $inc: { studentCount: -1 } }
    );

    return res.status(200).json({ msg: "Enroll deleted" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ msg: "Bad request for ferching enrollments." });
  }
};

export const getEnrolledByIdController = async (
  req: Request,
  res: Response
) => {
  try {
    const _id = req.params.id;
    const getEnrolled = await Enrollment.findOne({ _id });
    if (!getEnrolled) {
      return res.status(404).json({ msg: "Enrollment not found" });
    }
    return res.status(200).json({ getEnrolled });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ msg: "Bad request for ferching enrollments." });
  }
};

export const updateEnrolledByIdController = async (
  req: Request,
  res: Response
) => {
  const _id = req.params.id;

  console.log(req.body);
  const { userId, courseId, price, isFree, hasAccess } = req.body;
  const file = req.file;
  const filePath = file ? path.posix.join("uploads", file.filename) : "";

  const getEnroll = await Enrollment.findOne({ _id });
  if (!getEnroll) {
    return res.status(404).json({ msg: "Enrollment not found" });
  }

  const getCourse = await Course.findOne({ _id: courseId });
  if (!getCourse) {
    return res.status(404).json({ msg: "Coruse not found" });
  }
  const getUser = await User.findOne({ _id: userId });
  if (!getUser) {
    return res.status(404).json({ msg: "User not found" });
  }

  const updateEnroll = await Enrollment.updateOne(
    { _id },
    {
      userId: userId,
      courseId: getCourse._id,
      isFree: getCourse.isFree,
      amountPaid: getCourse.price,
      receipt: filePath || getEnroll.receipt,
      hasAccess: hasAccess,
      paymentId: getEnroll.paymentId,
    }
  );

  if (!updateEnroll) {
    return res.status(403).json({ msg: "Update failed." });
  }
  return res.status(200).json({ msg: "Enrollment updated." });
};
