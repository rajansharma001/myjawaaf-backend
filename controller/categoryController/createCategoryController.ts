import type { Request, Respose } from "express";
import { Category } from "../../model/categorySchema.ts";

export const createCategoryCotroller = async (req: Request, res: Respose) => {
  try {
    const { title, slug, description } = req.body;
    if (!title || !slug) {
      return res
        .status(404)
        .json({ msg: "Please fillup all required fields." });
    }
    const newCategory = { title, slug, description };
    const createCategory = await Category.create(newCategory);
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
