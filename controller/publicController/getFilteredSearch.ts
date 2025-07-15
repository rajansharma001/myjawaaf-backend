import type { Request, Response } from "express";
import { Course } from "../../model/courseSchema";
export const getFilteredCourses = async (req: Request, res: Response) => {
  try {
    const { search, category } = req.query;

    const filters: Record<string, any>[] = [];

    if (search) {
      filters.push({ title: { $regex: search, $options: "i" } });
    }

    if (category) {
      filters.push({ categoryId: category });
    }

    const query = filters.length > 0 ? { $or: filters } : {};

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
