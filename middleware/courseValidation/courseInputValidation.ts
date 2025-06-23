import type { Request, Response, NextFunction } from "express";
export const courseInputValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      title,
      slug,
      description,
      thumbnail,
      categoryId,
      isFree,
      price,
      discount,
      level,
      language,
      isPublished,
      tags,
      createdBy,
    } = req.body;

    if (
      !title ||
      !slug ||
      !description ||
      !thumbnail ||
      !isFree ||
      !isPublished ||
      !createdBy
    ) {
      return res.status(403).json({ msg: "Please fill all required fields." });
    }
    next();
  } catch (error) {
    console.log("something went wrong while validating course input", error);
    return res.status(500).json({ msg: "Bad Request on course creation." });
  }
};
