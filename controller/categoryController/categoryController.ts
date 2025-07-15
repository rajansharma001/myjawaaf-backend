import type { Request, Response } from "express";
import { CourseCategory } from "../../model/categorySchema.ts";

export const createCategoryCotroller = async (req: Request, res: Response) => {
  try {
    const { title, slug, description } = req.body;
    if (!title || !slug) {
      return res
        .status(404)
        .json({ msg: "Please fillup all required fields." });
    }
    const newCategory = { title, slug, description };
    const createCategory = await CourseCategory.create(newCategory);
    if (!createCategory) {
      return res.status(403).json({ msg: "Category creation failed." });
    }

    return res.status(200).json({ msg: "Category Created." });
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "Bad Request for category creation.", error });
  }
};

export const upadteCategoryCotroller = async (req: Request, res: Response) => {
  try {
    const { title, slug, description } = req.body;

    const _id = req.params.id;

    const updateCategoryDetails = { title, slug, description };
    const updateCategory = await CourseCategory.updateOne(
      { _id },
      { $set: updateCategoryDetails }
    );
    if (!updateCategory) {
      return res.status(403).json({ msg: "Category update failed." });
    }

    return res.status(200).json({ msg: "Category Updated." });
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "Bad Request for category update.", error });
  }
};

export const deleteCategoryCotroller = async (req: Request, res: Response) => {
  try {
    const _id = req.params.id;

    const deleteCategory = await CourseCategory.deleteOne({ _id });
    if (!deleteCategory) {
      return res.status(403).json({ msg: "Category delete failed." });
    }

    return res.status(200).json({ msg: "Category Deleted." });
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "Bad Request for category delete.", error });
  }
};

export const getCategoryCotroller = async (req: Request, res: Response) => {
  try {
    const fetchCategory = await CourseCategory.find();
    if (!fetchCategory) {
      return res.status(403).json({ msg: "Category fetch failed." });
    }

    return res.status(200).json({ fetchCategory });
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "Bad Request for category fetch.", error });
  }
};

export const getCategoryByIdCotroller = async (req: Request, res: Response) => {
  try {
    const _id = req.params.id;
    console.log("category id getting: ", _id);
    const fetchCat = await CourseCategory.findOne({ _id });
    console.log("category by id: ", fetchCat);
    if (!fetchCat) {
      return res.status(403).json({ msg: "Category fetch failed." });
    }

    return res.status(200).json({ fetchCat });
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "Bad Request for category fetch.", error });
  }
};
