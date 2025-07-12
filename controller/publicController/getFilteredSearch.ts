import type { Request, Response } from "express";
import { Course } from "../../model/courseSchema.ts";

export const getFilteredCourses = async (req: Request, res: Response) => {
  try {
    const { search, category } = req.query;

    const query: any = {};
    if (search) {
      query.title = { $regex: search, $options: "i" };
    }
    if (category) {
      query.categoryId = category;
    }

    const courses = await Course.find(query).populate("categoryId");

    if (!courses || courses.length === 0) {
      return res.status(404).json({ message: "No courses found" });
    }

    res.status(200).json(courses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
