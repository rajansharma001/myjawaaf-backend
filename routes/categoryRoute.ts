import express from "express";
import {
  createCategoryCotroller,
  deleteCategoryCotroller,
  getCategoryCotroller,
  upadteCategoryCotroller,
  getCategoryByIdCotroller
} from "../controller/categoryController/categoryController.ts";

export const categoryRoute = express.Router();

categoryRoute.post("/create-category", createCategoryCotroller);
categoryRoute.patch("/update-category/:id", upadteCategoryCotroller);
categoryRoute.delete("/delete-category/:id", deleteCategoryCotroller);
categoryRoute.get("/get-category", getCategoryCotroller);
categoryRoute.get("/get-category/:id", getCategoryByIdCotroller);
